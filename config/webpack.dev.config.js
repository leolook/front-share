const baseWebpackConfig = require("./webpack.base.config");
const merge = require("webpack-merge");

module.exports = merge(baseWebpackConfig, {
  // mode:"development"
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devServer: {
    //指定静态文件的路径
    compress: true, //开启gzip
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/tool": {
        target: "http://127.0.0.1:2030",
        changeOrigin: true
      }
    }
  }
});
