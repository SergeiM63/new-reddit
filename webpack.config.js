const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

function setupDevtool() {
    if(IS_DEV) return 'eval';
    if(IS_PROD) return false;
}

module.exports = {
    resolve: {
        extensions: ['.js','.jsx', '.ts', '.tsx', '.json'],
    },
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: path.resolve(__dirname, 'src/index.jsx'), // Задаем начало для WebPack
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    module: {
        rules: [{
            test: /.[tj]sx?$/,
            use: ['ts-loader'],
        }]
    },
    plugins: [
        new HTMLWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),
    ],
    devServer: {
        port: 3000,
        open: true, // автоматически откроется страница localhost:3000
        hot: IS_DEV, // чтобы сервер работал только в development режиме
    },
    devtool: setupDevtool(),
};
