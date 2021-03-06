const baseColor = "#00abf5";

const getFormatted = (object, prefix) => {
    let result = "";
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
    let result = "";
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

const isLeaf = value => typeof value === "string";

const isNode = value => typeof value === "object";

const hasNumber = string => /\d/.test(string);

const hasStar = string => /☆/.test(string) || /★/.test(string)

const howManyStars = string => string.match(/[*]/g).length

const unBoxing = string => string
    .split("\n")
    .map((el) => (hasStar(el) && isLeaf(el) ? el.replace("* ", "*_ <color:#b22746>") : el))
    .join("\n")

const givingPlantUmlSetting = string => {
    string = string.split("\n");
    string = coloringTheBox(string);
    string[0] =
        "@startmindmap\n!theme spacelab\ntitle Rika's Skill-visualizer\n\n" +
        string[0];
    string[string.length - 1] = "\nlegend right\n  Rika©\nendlegend\n@endmindmap";
    return string.join("\n");
};

const coloringTheBox = string => {
    return string.map((el) => {
        if (!el.includes("_") && el.length > 0) {
            const lightness = lightingWithDepth(el);
            return el.replace("* ", `*[${shadeOfColor(baseColor, lightness)}] <color:#464547>`);
        } else {
            return el;
        }
    });
};
const rgbToHex = color => {
    color = Math.round(color);
    if (color < 0) color = 0;
    if (color > 255) color = 255;
    let string = color.toString(16);
    if (string.length < 2) string = "0" + string;
    return string;
};
const colorHexForm = (red, green, blue) => "#" + rgbToHex(red) + rgbToHex(green) + rgbToHex(blue)

const lightingWithDepth = string => (howManyStars(string) * 2) / 10;

const shadeOfColor = (color, light) => {
    let red = parseInt(color.substr(1, 2), 16);
    let green = parseInt(color.substr(3, 2), 16);
    let blue = parseInt(color.substr(5, 2), 16);
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

const ranking = num => {
    if (num > 8) num = 8;
    if (num < 0) num = 0;
    const whiteStar = 8 - num;
    const blackStar = num;
    return "★".repeat(blackStar) + "☆".repeat(whiteStar);
}
const gettingLeaf = string => string.split("\n").map((el) => creatingNodeFromLeaf(el)).join("\n");

const creatingNodeFromLeaf = value => {
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

const getFormattedToUml = string => unBoxing(gettingLeaf(getFormatted(string, "")));

export const showToMeInPic = json => givingPlantUmlSetting(getFormattedToUml(json, ""))

export const showToMeOnSite = json => getVisualizedToSite(json, "")

  //☆ ★