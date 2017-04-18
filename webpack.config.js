const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');

module.exports = {
  entry: {
    app: './src/app.js',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },

  module: {
    noParse: /jquery/,
    rules: [{
      // ローダーの処理対象ファイル
      test: /\.js$/,
      // ローダーの処理対象から外すディレクトリ
      exclude: /node_modules|\.happypack/,
      // 利用するローダー
      use: [{
        loader: 'happypack/loader?id=js',
      }],
    }, {
      // preLoaders
      enforce: 'pre',
      // ローダーの処理対象ファイル
      test: /\.js$/,
      // ローダーの処理対象から外すディレクトリ
      exclude: /node_modules/,
      // 利用するローダー
      use: [{
        loader: 'eslint-loader',
      }],
    }],
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      /**
       * manifestファイルをロードして渡す
       */
      manifest: require('./dist/vendor-manifest.json'),
    }),
    new HappyPack({
      id: 'js',
      loaders: [{
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015'],
        },
      }],
      threads: 4,
    }),
  ],
};
