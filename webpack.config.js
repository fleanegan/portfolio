const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/js/app.ts',
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        assetModuleFilename: '[name][ext]',
        publicPath: "/portfolio/",
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    devServer: {
        static: './dist',
        historyApiFallback: {
            rewrites: [{ from: /^.*[^/]$/, to: '/' }],
        },
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: [
                    {loader: "ts-loader"}
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                type: 'asset/resource',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
}
