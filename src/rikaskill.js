//todo optimalization

var baseColor = "#00abf5";

export function plsWork(QQ) {
    var result = getFormatted(QQ, "");
    return plantUMLing(result);
}

export function showToMe(QQ) {
    var result = getVisualizedToSite(QQ, "");
    return result;
}

const isLeaf = function (x) {
    return typeof x === "string"
}

const isNode = function (x) {
    return typeof x === "object"
}

const getVisualizedToSite = function (object, prefix) {
    var result = "";
    Object.entries(object).forEach(([key, value], index, { length }) => {
        result += prefix + (index + 1 === length ? "└─ " : "├─ ") + key;
        if (value && isNode(value)) {
            result += "\n";
            result += getVisualizedToSite(value, prefix + (index + 1 === length ? "   " : "│  "));
        } else {
            if (value) result += ": " + value;
            result += "\n";
        }
    });
    return result;
}

//creating the data's into the shape of needing to plantUML
//todo isleaf isnode

const getFormatted = function (object, prefix) {
    var result = "";
    Object.entries(object).forEach(([key, value], index, { length }) => {
        result += prefix + (index + 1 === length ? "* " : "* ") + key;
        if (value && typeof value === "object") {
            result += "\n";
            result += getFormatted(value, prefix + (index + 1 === length ? "*" : "*"));
        } else {
            if (value || value === 0) result += ": " + value;
            result += "\n";
        }
    });
    return unBoxing(result);
}
//does the children got number?
const hasNumber = function (string) {
    return /\d/.test(string);
}
//leafs "unboxing"
const unBoxing = function (string) {
    return string
        .split("\n")
        .map((el) => (hasNumber(el) ? el.replace("* ", "*_ ") : el))
        .join("\n");
}
//adding plantUML settings
const plantUMLing = function (string) {
    string = string.split("\n");
    string = coloring(string);
    string[0] = "@startmindmap\n!theme spacelab\ntitle Rika's Skill-visualizer\n\n" + string[0];
    string[string.length - 1] = "\nlegend right\n  Rika©\nendlegend\n@endmindmap";
    return string.join("\n");
}

//adding color to the boxes
const coloring = function (string) {
    return string.map((el) => {
        if (!el.includes("_") && el.length > 0) {
            var lightness = lighting(el)
            return el.replace("* ", `*[${shade(baseColor, lightness)}] `)
        } else {
            return el
        }
    });
}

//converting colors to hexadecimal
const rgbToHex = function (color) {
    color = Math.round(color);
    if (color < 0) color = 0;
    if (color > 255) color = 255;
    var string = color.toString(16);
    if (string.length < 2) string = "0" + string;
    return string;
}

//hexadecimal form of colors
const color = function (red, green, blue) {
    return "#" + rgbToHex(red) + rgbToHex(green) + rgbToHex(blue);
}

//how much lightening?
const lighting = function (string) {
    var howManyStars = string.match(/[*]/g).length;
    return howManyStars / 10;
}

//getting lightness of the color
const shade = function (col, light) {
    var r = parseInt(col.substr(1, 2), 16);
    var g = parseInt(col.substr(3, 2), 16);
    var b = parseInt(col.substr(5, 2), 16);
    if (light < 0) {
        r = (1 + light) * r;
        g = (1 + light) * g;
        b = (1 + light) * b;
    } else {
        r = (1 - light) * r + light * 255;
        g = (1 - light) * g + light * 255;
        b = (1 - light) * b + light * 255;
    }
    return color(r, g, b);
}
