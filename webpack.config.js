const path = require(`path`);
const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
    mode: "development",
    entry: `./src/index.js`,
    devtool: `source-map`,
    output: {
        filename: `bundle.js`,
        path: path.join(__dirname, `public`)
    },
    devServer: {
        contentBase: path.join(__dirname, `public`),
        inline: false,
        port: 1337,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ],
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};