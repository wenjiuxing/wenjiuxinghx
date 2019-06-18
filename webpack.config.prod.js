const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// const { ReactLoadablePlugin } = require('react-loadable/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isServer = process.env.BUILD_TYPE === 'server';
const rootPath = path.join(__dirname, '../');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const prodConfig = {
  // context: path.join(rootPath,'./idm_mes'),
  entry: {
    Lee: "./webapp/com/idm/im/app/index.tsx",
    vendors: ['react', 'react-dom', 'react-redux', 'redux', 'react-router-dom', 'react-router-redux', 'redux-thunk'],
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[name].js',
    // libraryTarget: isServer?'commonjs2':'umd',
  },
  // devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", "css", ".less", ".scss", ".png", ".jpg"],
    // modules: [path.resolve(rootPath, "webapp"), "node_modules"],
  },
  module: {
      loaders: [
          { test: /\.css$/, loader: 'style-loader!css-loader?modules' },
          { test: /\.ts?$/, loader: "ts-loader" },
      ],

      rules: [
          { test: /\.tsx?$/, loader: "ts-loader" },
          { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              query: {
                  plugins: [
                      ['transform-runtime'],
                      ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
                  ],
                  presets: ['es2015', 'react', 'stage-2']
              }
          },{
              test: /\.less$/,
              use: [
                  'style-loader',
                  'css-loader',
                  'less-loader'
              ]
          },{
              test: /\.css$/,
              loader: "style-loader!css-loader"
          },
          {
            test: /\.(png|gif|jpg|svg|jpeg)$/i,
            use: {
              loader: 'file-loader',
              options: {
                name: '/[hash].[ext]',
                publicPath: "../dist/assets",
                outputPath: "assets",
              }
            }
          },
      ]
  },
  plugins: [
    new ManifestPlugin(),

    new ExtractTextPlugin({
      filename: 'css/style.[hash].css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([{ from: './webapp/com/idm/im/favicon.ico' }]),
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      title: 'yyy',
      publicUrl: './',
      filename: 'index.html',
      template: './index.html',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendors', 'manifest'],
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',

    }),
    // new ReactLoadablePlugin({
    //   filename: path.join('./dist/react-loadable.json'),
    // }),
    new UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: true,//console
          pure_funcs: ['console.log']//移除console
        }
      ,
      parallel: true,
      sourceMap: true
    })
  ]
}
module.exports = prodConfig