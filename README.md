<div align="center">
  <h1>ASCII to SVG</h1>
</div>

<p align="center">
  <img src="https://asciiku.netlify.app/?raw=https%3A%2F%2Fgist.githubusercontent.com%2FEmberNoGlow%2F5aa09f26f2b9d908b201d10e500e0a8c%2Fraw%2F637c9bdb5952d6ad58c47ed383485465c3b0d310%2Ffile.md&id=123&bg=%230000000&stroke=%23FF0000">
</p>

<div align="center">
  <img src="https://img.shields.io/github/stars/EmberNoGlow/asciiku?style=default&color=00ff00" width="80">
  <img src="https://img.shields.io/github/forks/EmberNoGlow/asciiku?style=default&color=ff6b6b" width="80">
  <img src="https://visitor-badge.laobi.icu/badge?page_id=EmberNoGlow.asciiku" width="100">
</div>

---

ASCII.Ku is a free, open-source web utility that dynamically renders ASCII art into clean SVG images using the svgbob engine.


It is specifically tailored for developer profiles and repository READMEs. Instead of manually converting and uploading static images, ASCII.Ku fetches your art directly from your source files on the fly. Update your text, and your diagrams update automatically.

## Usage

ASCII.Ku allows you to embed ASCII-based SVGs directly into your README files without adding extra files to your repository. Follow these three simple steps to get started:

### 1. Create a block in your README.md
Wrap your ASCII art in a custom comment tag and place it inside a html comment block. The ID can be any number of your choice (e.g., 1, 42, 123). Just ensure it matches the ID in your target URL.

```
<!--123
      /\
     /  \
    /    \
   /      \
  /   /\   \
 /   (  )   \
 \___/  \___/ 
--->
```

### 2. Generating an SVG URL
Follow the visual guide.

#### 1. Get raw file url
![](https://raw.githubusercontent.com/EmberNoGlow/asciiKu/refs/heads/main/screenshots/step1.png)

---

#### 2. Copy link
![](https://raw.githubusercontent.com/EmberNoGlow/asciiKu/refs/heads/main/screenshots/step2.png)

---

#### 3. Generate link via [Home page](asciiku.netlify.app/) (Recommended)
![](https://raw.githubusercontent.com/EmberNoGlow/asciiKu/refs/heads/main/screenshots/step3.png)

---

### 3. Embed the image
Insert the final URL into your Markdown file using standard image syntax:

> [!NOTE]
> replace `USER/REPO` and `PATH/TO/FILE.md` with existing file repo / file path

```
![my ascii art](https://asciiku.netlify.app/?id=123&raw=raw.githubusercontent.com/USER/REPO/refs/heads/main/PATH/TO/FILE.md)
```


### Alternative: Generate your SVG MANUALLY
You will need the direct link to your raw Markdown file. Use `?` after the domain slash `asciiku.netlify.app`, and combine the parameters below with `&`

| Parameter	Type | Importance | Description |
|:---------------|:-----------|:--------------------|
| raw    | Required | URL to your raw Markdown file on GitHub/Gist |
| id     | Required | The unique ID assigned to your ASCII art block |
| bg     | Optional | SVG background color (HEX or name)	%23ffffff or white |
| stroke | Optional	| Line and text color (HEX or name)	%23000000 or blue |

> [!WARNING]
> If you use a HEX color code (e.g. #ffffff), be sure to replace the # sign with the code %23, otherwise the link will break.


---

## Examples
Here I will give a couple of examples. All ASCII schemes are in this [gist](https://gist.githubusercontent.com/EmberNoGlow/5aa09f26f2b9d908b201d10e500e0a8c/raw/637c9bdb5952d6ad58c47ed383485465c3b0d310/file.md). Click on the images to open the link!

<div align="center">
  <a href="https://asciiku.netlify.app/?id=12&raw=https%3A%2F%2Fgist.githubusercontent.com%2FEmberNoGlow%2F5aa09f26f2b9d908b201d10e500e0a8c%2Fraw%2F637c9bdb5952d6ad58c47ed383485465c3b0d310%2Ffile.md&bg=%23FF7024&stroke=%23FFFFFF">
    <img src="https://asciiku.netlify.app/?id=12&raw=https%3A%2F%2Fgist.githubusercontent.com%2FEmberNoGlow%2F5aa09f26f2b9d908b201d10e500e0a8c%2Fraw%2F637c9bdb5952d6ad58c47ed383485465c3b0d310%2Ffile.md&bg=%23FF7024&stroke=%23FFFFFF" width="350">
  </a>

  <a href="https://asciiku.netlify.app/?raw=https%3A%2F%2Fgist.githubusercontent.com%2FEmberNoGlow%2F5aa09f26f2b9d908b201d10e500e0a8c%2Fraw%2F637c9bdb5952d6ad58c47ed383485465c3b0d310%2Ffile.md&id=123&bg=%232724FF&stroke=%23000000">
    <img src="https://asciiku.netlify.app/?raw=https%3A%2F%2Fgist.githubusercontent.com%2FEmberNoGlow%2F5aa09f26f2b9d908b201d10e500e0a8c%2Fraw%2F637c9bdb5952d6ad58c47ed383485465c3b0d310%2Ffile.md&id=123&bg=%232724FF&stroke=%23000000" width="256">
  </a>

  <a href="https://asciiku.netlify.app/?raw=https%3A%2F%2Fgist.githubusercontent.com%2FEmberNoGlow%2F5aa09f26f2b9d908b201d10e500e0a8c%2Fraw%2F637c9bdb5952d6ad58c47ed383485465c3b0d310%2Ffile.md&id=124&bg=%230000000&stroke=%2304FF00">
    <img src="https://asciiku.netlify.app/?raw=https%3A%2F%2Fgist.githubusercontent.com%2FEmberNoGlow%2F5aa09f26f2b9d908b201d10e500e0a8c%2Fraw%2F637c9bdb5952d6ad58c47ed383485465c3b0d310%2Ffile.md&id=124&bg=%230000000&stroke=%2304FF00" width="130">
  </a>
</div>

