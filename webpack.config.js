const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/client/dist'

  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './client/public/index.html'
    })
  ],

  devServer: {
    static: './client/dist',
    port: 3001,
    open: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000'
      }
    ]
  }
};
