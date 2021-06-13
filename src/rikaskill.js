export function showToMeInPic(json) {
    return givingPlantUmlSetting(getFormattedToUml(json, ""));
}
export function showToMeOnSite(json) {
    return getVisualizedToSite(json, "");
}

var baseColor = "#00abf5";

const getFormatted = (object, prefix) => {
    var result = "";
    Object.entries(object).forEach(([key, value], index, { length }) => {
        result += prefix + (index + 1 === length ? "* " : "* ") + key;
        if (value && isNode(value)) {
            result += "\n";
            result += getFormatted(
                value,
                prefix + (index + 1 === length ? "*" : "*")
            );
        } else {
            if (value || value === 0) result += ": " + value;
            result += "\n";
        }
    });
    return result
};

const getVisualizedToSite = (object, prefix) => {
    var result = "";
    Object.entries(object).forEach(([key, value], index, { length }) => {
        result += prefix + (index + 1 === length ? "└─ " : "├─ ") + key;
        if (value && isNode(value)) {
            result += "\n";
            result += getVisualizedToSite(
                value,
                prefix + (index + 1 === length ? "   " : "│  ")
            );
        } else {
            if (value || value === 0) result += " ─ " + value;
            result += "\n";
        }
    });
    return result;
};

const isLeaf = (value) => {
    return typeof value === "string";
};
const isNode = (value) => {
    return typeof value === "object";
};
const hasNumber = (string) => {
    return /\d/.test(string);
};
const hasStar = (string) => {
    return /☆/.test(string) || /★/.test(string)
}
const howManyStars = (string) => {
    return string.match(/[*]/g).length;
};
const unBoxing = (string) => {
    return string
        .split("\n")
        .map((el) => (hasStar(el) && isLeaf(el) ? el.replace("* ", "*_ ") : el))
        .join("\n");
};
const givingPlantUmlSetting = (string) => {
    string = string.split("\n");
    string = coloringTheBox(string);
    string[0] =
        "@startmindmap\n!theme spacelab\ntitle Rika's Skill-visualizer\n\n" +
        string[0];
    string[string.length - 1] = "\nlegend right\n  Rika©\nendlegend\n@endmindmap";
    return string.join("\n");
};

const coloringTheBox = (string) => {
    return string.map((el) => {
        if (!el.includes("_") && el.length > 0) {
            var lightness = lightingWithDepth(el);
            return el.replace("* ", `*[${shadeOfColor(baseColor, lightness)}] `);
        } else {
            return el;
        }
    });
};
const rgbToHex = (color) => {
    color = Math.round(color);
    if (color < 0) color = 0;
    if (color > 255) color = 255;
    var string = color.toString(16);
    if (string.length < 2) string = "0" + string;
    return string;
};
const colorHexForm = (red, green, blue) => {
    return "#" + rgbToHex(red) + rgbToHex(green) + rgbToHex(blue);
};
const lightingWithDepth = (string) => {
    return howManyStars(string) / 10;
};
const shadeOfColor = (color, light) => {
    var red = parseInt(color.substr(1, 2), 16);
    var green = parseInt(color.substr(3, 2), 16);
    var blue = parseInt(color.substr(5, 2), 16);
    if (light < 0) {
        red = (1 + light) * red;
        green = (1 + light) * green;
        blue = (1 + light) * blue;
    } else {
        red = (1 - light) * red + light * 255;
        green = (1 - light) * green + light * 255;
        blue = (1 - light) * blue + light * 255;
    }
    return colorHexForm(red, green, blue);
};

const ranking = (num) => {
    if (num > 8) num = 8
    if (num < 0) num = 0
    var whiteStar = 8 - num;
    var blackStar = num;
    var result = "★".repeat(blackStar) + "☆".repeat(whiteStar)
    return result
}
const gettingLeaf = (string) => {
    return string.split("\n").map((el) => creatingNodeFromLeaf(el)).join("\n");
}
const creatingNodeFromLeaf = (value) => {
    return value.split("\n").map((el) => {
        if (hasNumber(el)) {
            el = el.split(": ");
            el[1] = "*".repeat(howManyStars(el[0])) + "* " + ranking(el[1]);
            return el.join("\n");
        } else {
            return el;
        }
    });
};

const getFormattedToUml = (string) => {
    string = getFormatted(string, "")
    console.log(gettingLeaf(string))
    return unBoxing(gettingLeaf(string));
}
  //☆ ★