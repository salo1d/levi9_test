const path = require("path");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "js", "index.js")
  },
  output: {
    path: path.resolve(__dirname, "public", "js"),
    filename: "[name].js"
  },
  module: {
    rules: [
      { 
        test: /\.jsx?$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      }
    ]
  },
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  mode: 'development'
}