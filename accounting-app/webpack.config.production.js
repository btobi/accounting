var path = require('path');
var webpack = require('webpack');

var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/static/'
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react'],
                    plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties', 'lodash'],
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ],
    },

    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules'),
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            comments: false
        }),
        new BundleTracker({filename: './webpack-stats.json'}),
    ]
};
