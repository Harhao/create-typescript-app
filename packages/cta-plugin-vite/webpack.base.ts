import path from "path";
import os from "os";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { Eenvironment } from "./enum";

const workerCount = os.cpus().length - 1;
const __dirname = fileURLToPath(new URL(".", import.meta.url));

const pkgName = "smart-assistant";

const getWebpackBaseConfig = (envData) => ({
  entry: path.resolve(__dirname, "../main.tsx"),
  output: {
    library: `${pkgName}-[name]`,
    libraryTarget: "umd",
    chunkLoadingGlobal: `webpackJsonp_${pkgName}`,
    globalObject: "window",
    filename: "static/js/[name]_[chunkhash:8].bundle.js",
    chunkFilename: "static/js/[chunkhash:8].chunk.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: envData.PUBLIC_PATH,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: workerCount,
            },
          },
          {
            loader: "ts-loader",
            options: {
              //开启多线程编译
              happyPackMode: true,
              compilerOptions: {
                sourceMap: true,
                module: "esnext",
              },
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.svg/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "static/images/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(envData),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name]_[chunkhash:8].css",
      chunkFilename: "static/css/[name]_[chunkhash:8].css",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "../public/build.html"),
      hash: true,
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        polyfill: {
          name: "polyfill",
          test: /[\\/]node_modules[\\/](core-js|regenerator-runtime|react-app-polyfill|web-animations-js)[\\/]/,
          // chunks: 'initial',
          chunks: 'all',
          priority: 15,
        },
        common: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-redux|@reduxjs\/toolkit)[\\/]/,
          name: 'common',
          chunks: 'all',
        },
        vendor: {
          test: /[\\/]node_modules[\\/]@mail[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all',
          reuseExistingChunk: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false, // 禁止提取文件头部注释
        terserOptions: {
          compress: {
            drop_console: envData.NODE_ENV === Eenvironment.production, // 删除所有的 `console` 语句
          },
        },
      }),
    ],
  },
});
export default getWebpackBaseConfig;
