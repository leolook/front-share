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
    disableHostCheck: true,
    compress: true, //开启gzip
    host: "172.17.199.149",
    port: 4000,
    proxy: {
      "/tool": {
        target: "http://172.17.199.149:2030",
        changeOrigin: true
      }
    }
  }
});
