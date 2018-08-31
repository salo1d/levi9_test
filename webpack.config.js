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
      },
      {
        test: /\.styl|\.css$/,
        use: [
            {
                loader: 'style-loader',
                // options: { sourceMap: true }
            },
            {
                loader: 'css-loader',
                // options: { sourceMap: true }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        require('postcss-smart-import')({ /* ...options */ }),
                        require('precss')({ /* ...options */ }),
                        require('autoprefixer')({ /* ...options */ })
                    ],
                    // sourceMap: true
                }
            },
            {
                loader: 'stylus-loader',
                options: {
                    // sourceMap: true
                }
            }
        ]
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