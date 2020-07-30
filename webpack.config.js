var path = require('path')
var webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
    entry: './src/vue/main.js',
    output: {
        path: path.resolve(__dirname, './src/dist'),
        publicPath: '/src/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin()
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.mode = 'production'
    module.exports.devtool = '#source-map'
    module.exports.optimization = {
        minimize: true,
        minimizer: [new TerserPlugin()]
    }
}