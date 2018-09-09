'use strict';

import {DefinePlugin, NamedModulesPlugin, NoEmitOnErrorsPlugin} from 'webpack';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import path from 'path';

export default {
    devtool: 'cheap-module-source-map',
    entry: [
        path.resolve(__dirname, 'src/less/main.less'),
        path.resolve(__dirname, 'src/index.jsx')
    ],
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.tpl.html',
            inject: 'body',
            filename: 'index.html',
            hash: true
        }),
        new NoEmitOnErrorsPlugin(),
        new NamedModulesPlugin(),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin('styles.min.css'),
        new OptimizeCssAssetsPlugin(),
        new FaviconsWebpackPlugin('images/favicon.png'),
        new UglifyJsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/, use: ['source-map-loader'], enforce: 'pre'
            },
            {
                test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, include: __dirname
            },
            {
                test: /\.less$/, use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        importLoaders: 2
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            }, {
                test: /\.(png|jpe?g|gif|svg)$/,
                exclude: /icons/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name]---[hash:base64:5].[ext]'
                    }
                }]
            }, {
                test: /\.svg$/,
                include: /icons/,
                use: [{
                    loader: 'babel-loader'
                }, {
                    loader: 'react-svg-loader',
                    query: {
                        jsx: true,
                        svgo: {
                            plugins: [{
                                removeStyleElement: true,
                                cleanupAttrs: true,
                                cleanupIDs: true,
                                mergePaths: true,
                                removeUselessStrokeAndFill: true,
                                removeUnusedNS: true,
                                cleanupNumericValues: true
                            }],
                            floatPrecision: 2,
                            pretty: true
                        }
                    }
                }]
            },
            {test: /.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']},
            {test: /\.csv$/, loader: 'raw-loader'}
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules'],
        descriptionFiles: ['package.json'],
        mainFiles: ['index'],
        extensions: ['.js', '.jsx'],
        enforceExtension: false,
        alias: {
            styleGlobals: path.resolve(__dirname, 'src/styles/styleGlobals'),
            ConfiguredRadium: path.resolve(__dirname, 'src/styles/ConfiguredRadium'),
            ConfiguredAxios: path.resolve(__dirname, 'src/api/ConfiguredAxios')
        }
    },
    target: 'web'
};
