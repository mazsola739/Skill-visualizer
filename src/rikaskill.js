var skills = {
    js: {
        Frontend: {
            frameworks: {
                React: 0,
                Angular: 0,
                Vue: 0,
                Svelte: 0
            },
            coreConcepts: {
                syntax: 8,
                insertJsIntoHtml: 7,
                shorthands: 8,
                hoisting: 7,
                scope: 7,
                closures: 3,
                variables: 8,
                math: 8,
                strings: 8,
                arrays: 8,
                objects: 6,
                dates: 6,
                JSON: 5,
                async: 2,
                promises: 2,
                events: 4,
                callbackHell: 3,
                prototypeInheritence: 4,
                es6: 7,
                es2016: 7,
                es2017: 7,
                es2018: 7,
                es2019: 5,
                es2020: 3,
                es2021: 1
            }
        },
        Backend: {
            nodeJs: 0,
            deno: 0,
            webassembly: 0,
            v8: 0,
            chakra: 0,
            spidermonkey: 0
        }
    },
    css: {
        preProcessors: {
            sass: 7,
            less: 0,
            stylus: 0
        },
        coreConcepts: {
            syntax: 8,
            insertCssIntoHtml: 8,
            selectors: 7,
            unitsOfMeasurements: 6,
            cascading: 4,
            specificity: 5,
            boxModel: 8,
            css3Features: 7
        }
    },
    html: {
        coreConcepts: {
            editors: 7,
            syntax: 8,
            HTMLforms: 8,
            graphics: 5,
            media: 5,
            APIs: 3,
            css3Features: 6
        }
    }
};

var baseColor = "#00abf5";

function plsWork(QQ) {
    let grrrrrrr = document.write(plantUMLing(result));
    return grrrrrrr;
}

//creating the data's into the shape of needing to plantUML

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
    string[0] = "@startmindmap\n!theme spacelab\ntitle Skill-visualizer\n\n" + string[0];
    string[string.length - 1] = "\nlegend right\n  Rika©\nendlegend\n@endmindmap";
    return string.join("\n");
}

//adding color to the boxes
function coloring(string) {
    return string.map((el) => {
        if (!el.includes("_") && el.length > 0) {
            var lightness = lighting(el)
            return el.replace("* ", `* [${shade(baseColor, lightness)}]`)
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
    return (howManyStars * 2) / 10;
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

var result = getFormatted(skills, "");

plsWork(skills);

//console.log("Rika");
//console.log(shade(baseColor, 0.2));
console.log(plantUMLing(result));
