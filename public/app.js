const DEBUG_MODE = false;

const rawInput = document.getElementById("url");
const idInput = document.getElementById("id");

const strokePicker = document.getElementById("stroke-picker");
const strokeText = document.getElementById("stroke");

const bgPicker = document.getElementById("bg-picker");
const bgText = document.getElementById("bg");

const output = document.getElementById("output-url");
const copyBtn = document.querySelector(".btn-action");

const preview = document.querySelector(".canvas-area");
const previewHeader = document.querySelector(".gh-box-header");

function syncColor(picker, text) {
    picker.addEventListener("input", () => {
        text.value = picker.value.toUpperCase();
        update();
    });

    text.addEventListener("input", () => {

        let value = text.value.trim();

        if (!value.startsWith("#")) {
            value = "#" + value;
        }

        if (/^#[0-9A-F]{6}$/i.test(value)) {
            picker.value = value;
            text.value = value.toUpperCase();
        }

        update();

    });

}

syncColor(strokePicker, strokeText);
syncColor(bgPicker, bgText);

function generateUrl() {
    const params = new URLSearchParams();

    if (rawInput.value.trim())
        params.set("raw", rawInput.value.trim());

    if (idInput.value.trim())
        params.set("id", idInput.value.trim());

    if (bgText.value.trim())
        params.set("bg", bgText.value.trim());

    if (strokeText.value.trim())
        params.set("stroke", strokeText.value.trim());

    const siteUrl = DEBUG_MODE ? "http://127.0.0.1:8888/?" : "https://asciiku.netlify.app/?";

    const url = siteUrl + params.toString();

    output.value = url;

    return url;

}

async function loadPreview(url) {
    if (!rawInput.value.trim()) {
        preview.innerHTML = "<span>[ empty workspace ]</span>";
        previewHeader.textContent = "preview";

        return;
    }

    previewHeader.textContent = "preview / id: " + (idInput.value || "0");
    preview.innerHTML = "<span>Loading...</span>";

    try {
        const response = await fetch(url);

        if (!response.ok)
            throw new Error();

        const svg = await response.text();

        preview.innerHTML = svg;

        const svgElement = preview.querySelector("svg");

        if (svgElement) {
            const box = svgElement.viewBox.baseVal;

            if (box.width && box.height) {
                const ratio = box.width / box.height;

                if (ratio > 2) {
                    svgElement.style.width = "100%";
                    svgElement.style.height = "auto";
                } else {
                    svgElement.style.width = "auto";
                    svgElement.style.height = "300px";
                }
            }

            svgElement.setAttribute(
                "preserveAspectRatio",
                "xMidYMid meet"
            );
        }

    } catch {
        preview.innerHTML =
            "<span style='color:#ff7b72'>Failed to load preview.</span>";

    }

}

function update() {
    const url = generateUrl();
    loadPreview(url);

}
[
    rawInput,
    idInput,
    strokeText,
    bgText
].forEach(el => {

    el.addEventListener("input", update);

});

copyBtn.addEventListener("click", async () => {
    if (!output.value) return;

    await navigator.clipboard.writeText(output.value);

    copyBtn.textContent = "✓ Copied";
    copyBtn.style.background = "#1f6feb";

    setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.style.background = "";
    }, 1500);
});

update();