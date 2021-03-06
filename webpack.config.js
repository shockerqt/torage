const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    dev: './example/index.ts'
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './example',
    client: {
      progress: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // Embed your WGSL files as strings
        test: /\.wgsl$/i,
        type: "asset/source",
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
