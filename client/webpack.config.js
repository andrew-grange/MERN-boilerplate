"use strict"
let webpack = require("webpack");
let path = require("path");
const srcDir = path.join(__dirname, "./");

const shouldExcludeFile = filePath =>
    filePath.includes('node_modules') || path.relative(srcDir, filePath).startsWith('..');

module.exports = {
    context: __dirname,
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "../public/build"),
        filename: "bundle.js",
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader",
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    }
};
