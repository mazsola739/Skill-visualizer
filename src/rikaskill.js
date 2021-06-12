//todo optimalization

var baseColor = "#00abf5";

export function plsWork(QQ) {
    var result = getFormatted(QQ, "");
    return plantUMLing(result);
}

//creating the data's into the shape of needing to plantUML
//todo isleaf isnode 
function getFormatted(object, prefix) {
    var result = "";
    Object.entries(object).forEach(([k, v], i, { length }) => {
        result += prefix + (i + 1 === length ? "* " : "* ") + k;
        if (v && typeof v === "object") {
            result += "\n";
            result += getFormatted(v, prefix + (i + 1 === length ? "*" : "*"));
        } else {
            if (v || v === 0) result += ": " + v;
            result += "\n";
        }
    });
    return unBoxing(result);
}
//does the children got number?
function hasNumber(string) {
    return /\d/.test(string);
}
//last leafs "unboxing"
function unBoxing(string) {
    return string
        .split("\n")
        .map((el) => (hasNumber(el) ? el.replace("* ", "*_ ") : el))
        .join("\n");
}
//adding plantUML settings
function plantUMLing(string) {
    string = string.split("\n");
    string = coloring(string);
    string[0] = "@startmindmap\n!theme spacelab\ntitle Rika's Skill-visualizer\n\n" + string[0];
    string[string.length - 1] = "\nlegend right\n  Rika©\nendlegend\n@endmindmap";
    return string.join("\n");
}

//adding color to the boxes
function coloring(string) {
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
function rgbToHex(color) {
    color = Math.round(color);
    if (color < 0) color = 0;
    if (color > 255) color = 255;
    var string = color.toString(16);
    if (string.length < 2) string = "0" + string;
    return string;
}

//hexadecimal form of colors
function color(red, green, blue) {
    return "#" + rgbToHex(red) + rgbToHex(green) + rgbToHex(blue);
}

//how much lightening?
function lighting(string) {
    var howManyStars = string.match(/[*]/g).length;
    return howManyStars / 10;
}

//getting lightness of the color
function shade(col, light) {
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



//plsWork(skills);

//console.log("Rika");
//console.log(shade(baseColor, 0.2));
//console.log(plantUMLing(result));
