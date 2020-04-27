const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const fs = require("fs");

module.exports = (env) => {
  //.env 환경변수 불러오기
  const currentPath = path.join(__dirname);
  const basePath = currentPath + "/.env";
  const envPath = basePath + "." + env.ENVIRONMENT;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    mode: "development",
    entry: {
      index: "./src/index.js",
    },
    output: {
      // bundled compiled 파일
      path: path.join(__dirname, "/static"), //__dirname : 현재 디렉토리, dist 폴더에 모든 컴파일된 하나의 번들파일을 넣을 예정
      filename: "index_bundle.js",
    },
    module: {
      rules: [
        // javascript 모듈을 생성할 규칙을 지정 (node_module을 제외한.js 파일을 babel-loader로 불러와 모듈을 생성
        {
          test: /\.js$/, // .js, .jsx로 끝나는 babel이 컴파일하게 할 모든 파일
          exclude: /node_module/, // node module 폴더는 babel 컴파일에서 제외
          use: {
            loader: "babel-loader", // babel loader가 파이프를 통해 js 코드를 불러옴
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpe?g|otf)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                publicPath: "./",
                name: "[name].[ext]?[hash]",
              },
            },
          ],
        },
        {
          test: /\.(ico)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                publicPath: "./static/",
                name: "[name].[ext]?[hash]",
                limit: 10000,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html", // 생성한 템플릿 파일
        filename: "./index.html",
      }),
      new webpack.DefinePlugin(envKeys),
    ],
    devServer: {
      contentBase: path.join(__dirname, "/static"),
      inline: true,
      hot: true,
      host: "localhost",
      port: 5500,
      historyApiFallback: true,
    },
  };
};
