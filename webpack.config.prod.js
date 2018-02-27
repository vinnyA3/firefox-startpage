const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const config = {
  entry: ['./src/index'],
  context: __dirname,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  target: 'web',
  devtool: 'source-map',
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'sass'),
      'node_modules'
    ],
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/templates/index.htm'),
      inject: 'body'
    })
  ]
}

module.exports = config
