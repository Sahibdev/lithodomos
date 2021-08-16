const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HappyPack = require('happypack');
const defineNodeExternals = require('webpack-node-externals');

const config = {
  devtool: false,
  entry: './src/index.js',
  // prevent deps from getting baked in
  externals: [defineNodeExternals()],
  mode: 'production',
  module: {
    rules: [
      {
        use: 'happypack/loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  optimization: { minimize: false },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    library: 'default',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: true }),
    new HappyPack({
      use: [
        {
          path: 'babel-loader',
          query: {
            cacheDirectory: false,
          },
        },
      ],
    }),
  ],
  stats: {
    maxModules: Infinity,
    optimizationBailout: true,
  },
  target: 'node',
};

module.exports = config;
