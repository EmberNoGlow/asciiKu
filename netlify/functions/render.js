const { readFileSync } = require('fs');
const { resolve } = require('path');
const axios = require('axios');

let wasmInitialized = false;
let svgbobBg;

async function initWasm() {
  if (wasmInitialized) return;

  svgbobBg = require('./svgbob/svgbob_wasm_bg.js');

  const wasmPath = resolve(process.cwd(), 'netlify/functions/svgbob/svgbob_wasm_bg.wasm');
  const wasmBuffer = readFileSync(wasmPath);

  const imports = { './svgbob_wasm_bg.js': svgbobBg };
  const { instance } = await WebAssembly.instantiate(wasmBuffer, imports);

  globalThis.wasm = instance.exports;
  wasmInitialized = true;
}

function extractAscii(markdown, blockId) {
  const regex = new RegExp(
    String.raw`<!--\s*${blockId}\s*[\r\n]+([\s\S]*?)\s*--->`
  );
  const match = markdown.match(regex);
  return match ? match[1] : null;
}

exports.handler = async (event, context) => {
  const params = event.queryStringParameters || {};
  const { raw, id, bg, stroke } = params;

  if (!raw && !id) {
    try {
      const htmlPath = resolve(process.cwd(), 'public/index.html'); 
      const htmlContent = readFileSync(htmlPath, 'utf8');
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
        body: htmlContent,
      };
    } catch (htmlError) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        body: `Error loading index.html: ${htmlError.message}. Check paths.`,
      };
    }
  }

  if (!raw || !id) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: 'Both "raw" and "id" query parameters are required.',
    };
  }

  try {
    const response = await axios.get(raw, { responseType: 'text' });
    const markdownText = response.data;

    await initWasm();

    const asciiText = extractAscii(markdownText, id);

    if (!asciiText) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        body: `Error: Block <!--${id} not found`,
      };
    }
    
    if (typeof svgbobBg.render !== 'function') {
      throw new Error("Render func not found (svgbob)");
    }

    let svgResult = svgbobBg.render(asciiText);

    svgResult = svgResult.replace(
      /<svg([^>]*)>/,
      (match, attrs) => {
        if (attrs.includes('viewBox')) {
          return match;
        }

        const widthMatch = attrs.match(/width="([^"]+)"/);
        const heightMatch = attrs.match(/height="([^"]+)"/);

        if (!widthMatch || !heightMatch) {
          return match;
        }

        const width = widthMatch[1];
        const height = heightMatch[1];

        return `<svg${attrs} viewBox="0 0 ${width} ${height}">`;
      }
    );

    let customStyles = '';
    if (stroke) {
      customStyles += `
        .backdrop { display: none !important; }
      `;

      customStyles += `
        rect, circle, path, line, polyline, polygon { stroke: ${stroke} !important; }
        path[fill^="#"], polygon, .filled, circle:not([fill="none"]) { fill: ${stroke} !important; }
        text { fill: ${stroke} !important; stroke: none !important; }
      `;
    }
    if (bg) {
      customStyles += `svg { background-color: ${bg} !important; }`;
    }
    if (customStyles) {
      svgResult = svgResult.replace('</style>', `${customStyles}</style>`);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=60',
      },
      body: svgResult,
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: `Error: ${error.message}`,
    };
  }
};
