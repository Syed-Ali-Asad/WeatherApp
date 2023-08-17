export const logResponse = function (type, message) {
    var icon = {
        error: "❌",
        success: "✅",
        warning: "⚠️ ",
        notify: "🔔",
        info: "🚩",
    };
    var textColor = {
        error: "\u001b[1;31m",
        success: "\u001b[1;32m",
        notify: "\u001B[93m",
        warning: "\u001b[1;33m",
        info: "\u001b[1;34m",
    };
    if (type == "json")
        console.log(icon["info"] + " " + JSON.stringify(message, null, 2));
    else
        console.log("".concat(icon[type], " ").concat(textColor[type]).concat(message, "\u001B[0m"));
};