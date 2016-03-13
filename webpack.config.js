module.exports = {
    entry: './client/index.jsx',
    output: {
        publicPath: 'http://localhost:8090/assets'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              plugins: ['transform-object-assign'],
              presets: ['react', 'es2015']
            }
          }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
          }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
