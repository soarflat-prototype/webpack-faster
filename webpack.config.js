const path = require('path');
const webpack = require('webpack');

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
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015'],
        },
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
  ],
};
