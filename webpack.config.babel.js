'use strict';

import { DefinePlugin, HotModuleReplacementPlugin, NamedModulesPlugin, NoEmitOnErrorsPlugin } from 'webpack';

import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default {
    devtool: "#inline-source-map",
    devServer: {
        historyApiFallback: true,
        hot: true,
        stats: 'minimal',
        host: "0.0.0.0",
        disableHostCheck: true
    },
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.resolve( __dirname, 'src/less/main.less' ),
        path.resolve( __dirname, 'src/index.jsx' )
    ],
    output: {
        path: path.resolve( __dirname, 'build/' ),
        filename: '[name].js',
        publicPath: '/',
        sourceMapFilename: '[name].map'
    },
    plugins: [
        new HtmlWebpackPlugin( {
            template: 'src/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        } ),
        new HotModuleReplacementPlugin(),
        new NoEmitOnErrorsPlugin(),
        new NamedModulesPlugin(),
        new DefinePlugin( {
            'process.env.NODE_ENV': JSON.stringify( 'development' )
        } ),
        new FaviconsWebpackPlugin( 'images/favicon.png' ),
    ],
    module: {
        rules: [
            /* {
                        test: /\.jsx?$/,
                        enforce: 'pre',
                        exclude: /node_modules/,
                        loader: 'eslint-loader',
                        options: {
                            configFile: '.eslintrc',
                            failOnWarning: false,
                            failOnError: false
                        }
                    }, */
            {
                test: /\.jsx?$/,
                use: [ 'source-map-loader' ],
                enforce: 'pre'
            }, {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: __dirname
            }, {
                test: /\.less$/,
                use: [ {
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
                } ]
            }, {
                test: /\.(png|jpe?g|gif|svg)$/,
                exclude: /icons/,
                use: [ {
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name]---[hash:base64:5].[ext]'
                    }
                } ]
            }, {
                test: /\.svg$/,
                include: /icons/,
                use: [ {
                    loader: 'babel-loader'
                }, {
                    loader: 'react-svg-loader',
                    query: {
                        jsx: true,
                        svgo: {
                            plugins: [ {
                                removeStyleElement: true,
                                cleanupAttrs: true,
                                cleanupIDs: true,
                                mergePaths: true,
                                removeUselessStrokeAndFill: true,
                                removeUnusedNS: true,
                                cleanupNumericValues: true
                            } ],
                            floatPrecision: 2,
                            pretty: true
                        }
                    }
                } ]
            }
        ]
    },
    resolve: {
        modules: [ path.resolve( __dirname, './src' ), 'node_modules' ],
        descriptionFiles: [ 'package.json' ],
        mainFiles: [ 'index' ],
        extensions: [ '.js', '.jsx' ],
        enforceExtension: false,
        alias: {
            styleGlobals: path.resolve( __dirname, 'src/styles/styleGlobals' ),
            ConfiguredRadium: path.resolve( __dirname, 'src/styles/ConfiguredRadium' ),
            ConfiguredAxios: path.resolve( __dirname, 'src/api/ConfiguredAxios' )
        }
    }
};
