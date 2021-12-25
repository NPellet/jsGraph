const path = require('path');

const babel = {
  test: /\.(m?js|ts)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              chrome: '90',
            },
            useBuiltIns: 'usage',
            corejs: '3.6.5',
          },
        ],
        ['@babel/preset-typescript'],
      ],
      plugins: ['@babel/plugin-proposal-class-properties'],
    },
  },
};

const clientConfig = {
  target: 'web', // <=== can be omitted as default is 'web'
  output: {
    library: {
      type: 'commonjs',
    },
    path: path.resolve(__dirname, 'dist'),
    filename: 'jsGraph.js',
  },
  optimization: {
    minimize: true,
  },

  mode: 'production',
  entry: './src/graph.ts',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    aliasFields: ['browser'],
  },

  module: {
    rules: [babel],
  },
};

module.exports = clientConfig;
