var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

const plugins = [
    new CopyWebpackPlugin([{
            from: './*.html'
        },
        {
            from: './images',
            to: 'images'
        },
        {
            from: '../node_modules/leaflet/dist/images',
            to: 'images'
        },
        {
            from: '../node_modules/leaflet-draw/dist/images',
            to: 'images'
        }
    ]),
    new ExtractTextPlugin('/css/style.min.css', {
        allChunks: true
    })
];

module.exports = {
    context: path.join(__dirname, 'src'),
    debug: debug,
    devtool: debug ? 'inline-sourcemap' : null,
    entry: ['./less/main.less', './js/client.js'],
    output: {
        publicPath: '/', //important for hot module replacement in conjunction with --content-base it has to equal path
        path: path.join(__dirname, 'dist/'),
        filename: 'js/client.min.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js',
        lazy: true
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'dist')
            ],
            /*include: [
              path.resolve(__dirname, "src/js"),
            ],*/
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
            }
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', debug ? 'css-loader?sourceMap=inline&importLoaders=1!postcss-loader?sourceMap=inline!less-loader?sourceMap=inline' : 'css-loader?importLoaders=1&minimize!postcss-loader!less-loader')
        }/*, {
            test: /\.(woff|woff2|eot|ttf)$/,
            loader: 'file-loader?publicPath=../&name=fonts/[name].[ext]',
        }*/, {
            test: /\.svg$/,
            loader: 'react-svg',
            query: {
                es5: true,
                svgo: {
                    // svgo options
                    plugins: [{
                        removeTitle: false,
                        removeStyleElement: true
                    }],
                    floatPrecision: 3,
                    pretty: true
                }
            },
            include: /icons/
        }, {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            loader: 'file-loader?publicPath=../&name=images/[name].[ext]',
            exclude: /icons/
        }]
    },
    postcss: [autoprefixer({
        browsers: ['last 2 versions']
    })],
    plugins: debug ? plugins : plugins.concat(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false
        })
    )
};
