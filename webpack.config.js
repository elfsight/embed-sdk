const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const copyright = () => {
  const year = (new Date()).getFullYear();

  return `\r\n\telfsight.com\r\n\r\n\tCopyright (c) ${year} Elfsight, LLC. ALL RIGHTS RESERVED\r\n`;
};

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const target = process.env.WEBPACK_TARGET || 'umd';
  const minimize = Boolean(process.env.WEBPACK_MINIMIZE);

  return {
    resolve: {
      alias: {
        'react': 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      },
    },

    entry: './src/index.js',

    output: {
      filename: `embed-sdk.${target}.js`,
      path: path.join(__dirname, 'lib'),
      library: 'ElfsightEmbedSDK',
      libraryTarget: target === 'cjs' ? 'commonjs' : target
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },

        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                prettier: false,
                svgo: false,
                dimensions: false,
              },
            }
          ]
        }
      ]
    },

    optimization: { minimize },

    plugins: [
      new webpack.BannerPlugin(copyright()),
      new BundleAnalyzerPlugin({
        openAnalyzer: true,
        analyzerMode: isProduction ? 'static' : false,
        reportFilename: '../bundle-report.html',
        generateStatsFile: false,
      })
    ],

    devServer: {
      contentBase: path.join(__dirname, 'public'),
      compress: true,
      port: 9000,
      host: '0.0.0.0',
      watchContentBase: true
    }
  };
};
