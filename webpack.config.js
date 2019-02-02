const path = require("path");

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  mode,
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "assets")
  },
  entry: ["./_js/app.js"]
};
