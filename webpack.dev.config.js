const webpack = require('webpack');
var path = require('path');
const rootPath = path.join(__dirname, '../')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const os = require('os');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
module.exports = {
  entry: {main: "./webapp/com/idm/im/app/index.tsx" },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    chunkFilename: '[name]-[id].[hash:8].bundle.js',

  },
  devServer: {
    // port: 8090,
    hot: true,
    publicPath: '/dist/',
    historyApiFallback: {
      index: './index.html'
    }
  },
  devtool: "inline-source-map",
  externals: {
    
    jquery: 'jQuery',
   
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", "css", ".less", ".scss", ".png", ".jpg"],
    modules: [path.resolve(rootPath, "webapp"), "node_modules"],
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader?modules' },
    ],
    rules: [

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
        {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [

          {
            loader: "ts-loader"
          }
        ],
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([{ from: './webapp/com/idm/im/favicon.ico' }]),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin({ summary: false }),
    new ExtractTextPlugin({ filename: 'style.[hash].css', }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new HappyPack({
      id: 'tsx',
      threadPool: happyThreadPool,
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: ['syntax-dynamic-import']
        }
      }]
    }),
    // new ExtractTextPlugin('[name].css'),
    //这里开始写
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'cosmo-开发模式',
      // favicon:'./src/favicon.favicon.favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      hash: true,
      // 这样每次客户端页面就会根据这个hash来判断页面是否有必要刷新
      // 在项目后续过程中，经常需要做些改动更新什么的，一但有改动，客户端页面就会自动更新！
      inject: 'body'
      // filename: './dist/index.html',
      // template: './index.html', // html模板路径,模板路径是支持传参调用loader的,
      // inject: 'body', //打包之后的js插入的位置，true/'head'/'body'/false,
      // //      chunks: ['这里写entry里面你想引用哪些打包的js文件,这文件是个数组']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    })

    // 分割代码
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common' // Specify the common bundle's name.
    // }),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.jQuery": "jquery",
    //   "window.main":''
    // })
  ],
};
