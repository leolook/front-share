var path = require("path");
var webpack = require("webpack");

module.exports = {
  devtool: "#source-map",
  entry: ["./src"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
    publicPath: "/dist/"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        include: path.join(process.cwd(), "src")
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // <-- 减少 React 大小的关键
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(), //删除类似的重复代码
    new webpack.optimize.UglifyJsPlugin(), //最小化一切
    new webpack.optimize.AggressiveMergingPlugin() //合并块
  ]
};
