const path = require("path");

module.exports = {
  entry: "./app.js",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.bundle.js",
  },
  mode: "production", // "development" | "production"
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    uws: "uws",
  },
};
