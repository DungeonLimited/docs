/* global require, __dirname, process */
const pkg = require('./package.json')
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

const DIST_FOLDER = path.resolve(__dirname, './dist')

/* global module */
module.exports = {
  entry: './src/js/main.js',
  output: {
    path: DIST_FOLDER,
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|json|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([ DIST_FOLDER ]),
    new webpack.DefinePlugin({
      PKG: JSON.stringify(pkg),
      DATE: JSON.stringify(new Date())
    }),
    new HtmlWebpackPlugin({
      pkg,
      template: 'src/index.ejs',
      favicon: 'src/assets/darl-icon-32x16.png',
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  devServer: {
    contentBase: './',
    historyApiFallback: true,
    noInfo: true,
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  )
  module.exports.plugins.push(
    new webpack.LoaderOptionsPlugin({ minimize: true })
  )
}

/*
 Service Worker for offline user experience
 Offline plugin should be last one (as from offline-plugin doc
 */
if (process.env.SW) {
  module.exports.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        SW: true
      }
    })
  )
  module.exports.plugins.push(
    new OfflinePlugin({
      AppCache: false,
      ServiceWorker: {
        events: true,
        navigateFallbackURL: '/'
      },
      autoUpdate: 1000 * 60 * 5,
      responseStrategy: 'cache-first',
      updateStrategy: 'changed'
    })
  )
}
