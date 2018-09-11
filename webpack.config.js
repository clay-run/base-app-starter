var path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/app.jsx'
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/build',
        publicPath: '/'
    },
    devServer: {
        contentBase: __dirname + '/src',
        historyApiFallback: {
            index: 'index.html'
        }
    },
    module: {
        loaders: [{
                // Use babel to transpile react and es2016
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'stage-2', 'env'],
                    plugins: [
                        'transform-class-properties'
                    ]
                }
            },
            {
                test: /\.(scss|css)$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=8192&[path][name].[ext]' // inline base64 URLs for <=8k images, direct URLs for the rest
            },
            // Included a JSON parser for the purpose
            // of the InputJson Editor - we should revisit this
            // if we end up not using it.
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(ttc|otf)$/,
                loader: 'file-loader?name=public/fonts/[name].[ext]'
            }
        ]
    },
    externals: [{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequestç}'
    }],
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                ENV: JSON.stringify('dev'),
                NODE_ENV: JSON.stringify('dev'),
                API_HOST: JSON.stringify('http://localhost:3001/v1')
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.html']
    },
    devtool: 'module-source-map'
}