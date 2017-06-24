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
        plugins: ['add-module-exports', 'transform-object-assign'],
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.s?css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader'
      }]
    }
    ]
  },
  resolve: {
    extensions: ['.*', '.js', '.jsx']
  }
}
