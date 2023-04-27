const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.ts'),
    externals: [nodeExternals()],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: { type: 'commonjs2' },
    },
    plugins: [
        new NodemonPlugin(),
    ],
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src/') // added this
        },
        extensions: ['.ts', '.js'],
    },
    target: 'node',
};
