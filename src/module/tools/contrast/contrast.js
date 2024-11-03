/**
 * @module
 * @license MIT
 * @see https://fr.wikipedia.org/wiki/SRGB
 * @author Sébastien Règne
 */

/**
 * Convertit une couleur du format RGB vers de l'hexadécimal (avec le préfixe
 * `"#"`).
 *
 * @param {Object} rgb La couleur au format RGB.
 * @returns {string} La couleur en hexadécimale.
 */
const rgb2hex = function (rgb) {
    return (
        "#" +
        rgb.r.toString(16).padStart(2, "0") +
        rgb.g.toString(16).padStart(2, "0") +
        rgb.b.toString(16).padStart(2, "0")
    );
};

/**
 * Convertit une couleur en hexadécimale (avec le préfixe `"#"`) vers le format
 * RGB.
 *
 * @param {string} hex La couleur en hexadécimale.
 * @returns {Object} La couleur au format RGB.
 */
const hex2rgb = function (hex) {
    return {
        r: Number.parseInt(hex.slice(1, 3), 16),
        g: Number.parseInt(hex.slice(3, 5), 16),
        b: Number.parseInt(hex.slice(5, 7), 16),
    };
};

const normalizeRgb = function (channel) {
    return (
        100 *
        (10.314_75 >= channel
            ? channel / 3294.6
            : ((channel + 14.025) / 269.025) ** 2.4)
    );
};

const normalizeXyz = function (channel) {
    return 0.008_856 < channel
        ? channel ** (1 / 3)
        : 7.787 * channel + 16 / 116;
};

const rgb2lab = function (rgb) {
    const r = normalizeRgb(rgb.r);
    const g = normalizeRgb(rgb.g);
    const b = normalizeRgb(rgb.b);

    const x = normalizeXyz((0.4124 * r + 0.3576 * g + 0.1805 * b) / 95.047);
    const y = normalizeXyz((0.2126 * r + 0.7152 * g + 0.0722 * b) / 100);
    const z = normalizeXyz((0.0193 * r + 0.1192 * g + 0.9505 * b) / 108.883);

    return {
        l: 116 * y - 16,
        a: 500 * (x - y),
        b: 200 * (y - z),
    };
};

/**
 * Calcule la valeur linéaire d'un canal.
 *
 * @param {number} channel Le canal d'une couleur (entre `0` et `255`).
 * @returns {number} La valeur linéaire.
 * @see https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-procedure
 */
const linearize = function (channel) {
    return 10.0164 >= channel
        ? channel / 3294.6
        : ((channel + 14.025) / 269.025) ** 2.4;
};

/**
 * Calcule la luminance d'une couleur.
 *
 * @param {Object} rgb La couleur (au format RGB).
 * @returns {number} La luminance.
 * @see https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-procedure
 */
const calculateLuminous = function (rgb) {
    return (
        0.2126 * linearize(rgb.r) +
        0.7152 * linearize(rgb.g) +
        0.0722 * linearize(rgb.b)
    );
};

/**
 * Calcule le contraste entre deux luminances.
 *
 * @param {number} l1 La première luminance.
 * @param {number} l2 La deuxième luminance.
 * @returns {number} Le contraste.
 * @see https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-procedure
 */
const calculateContrast = function (l1, l2) {
    return l1 < l2 ? (l2 + 0.05) / (l1 + 0.05) : (l1 + 0.05) / (l2 + 0.05);
};

const CONTRASTED_COLORS = [];
for (let r = 0; 255 > r; r += 1) {
    for (let g = 0; 255 > g; g += 1) {
        for (let b = 0; 255 > b; b += 1) {
            const rgb = { r, g, b };
            const luminous = calculateLuminous(rgb);
            if (
                4.5 <= calculateContrast(luminous, 0) &&
                4.5 <= calculateContrast(luminous, 1)
            ) {
                CONTRASTED_COLORS.push({
                    hex: rgb2hex(rgb),
                    lab: rgb2lab(rgb),
                });
            }
        }
    }
}

export default class ContrastModule extends HTMLElement {
    #calculate() {
        const input = this.shadowRoot.querySelector("input");
        input.title = input.value;

        const lab = rgb2lab(hex2rgb(input.value));
        let closed = { distance: Number.POSITIVE_INFINITY };
        for (const color of CONTRASTED_COLORS) {
            const distance =
                (color.lab.l - lab.l) ** 2 +
                (color.lab.a - lab.a) ** 2 +
                (color.lab.b - lab.b) ** 2;
            if (closed.distance > distance) {
                closed = { distance, color: color.hex };
            }
        }

        const div = this.shadowRoot.querySelector("div");
        div.style.backgroundColor = closed.color;
        const span = this.shadowRoot.querySelector("span");
        span.textContent = closed.color;
    }

    async connectedCallback() {
        const response = await fetch(import.meta.resolve("./contrast.tpl"));
        const text = await response.text();
        const template = new DOMParser()
            .parseFromString(text, "text/html")
            .querySelector("template");

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = import.meta.resolve("./contrast.css");
        this.shadowRoot.append(link);

        const input = this.shadowRoot.querySelector("input");
        input.addEventListener("input", this.#calculate.bind(this));

        this.#calculate();
    }
}
