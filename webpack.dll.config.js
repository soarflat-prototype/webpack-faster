const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['jquery', 'velocity-animate'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].dll.js',
    /**
     * output.library
     * グローバル変数に指定した値を定義する
     * 今回の場合、`window.vendor`が出力される
     */
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist', '[name]-manifest.json'),
      name: '[name]',
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
