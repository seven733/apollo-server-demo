const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['./src/sever.ts'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  mode: "development",
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': `${__dirname}/src/`,
      'utils': `${__dirname}/src/utils/`,
      'models': `${__dirname}/src/models/`,
      'services': `${__dirname}/src/services/`
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};
