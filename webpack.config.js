module.exports = {
    entry: './client/index.jsx',
    output: {
        publicPath: 'http://localhost:8090/assets'
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: 'jsx-loader?insertPragma=React.DOM&harmony'
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
