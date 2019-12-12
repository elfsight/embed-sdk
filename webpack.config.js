const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const copyright = () => {
  const year = (new Date()).getFullYear();

  return `\r\n\telfsight.com\r\n\r\n\tCopyright (c) ${year} Elfsight, LLC. ALL RIGHTS RESERVED\r\n`;
};

const browsers = [
  'last 2 versions',
  'ie >= 9',
  'safari >= 7',
  'not dead'
];

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    resolve: {
      alias: {
        "react": "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat"
      },
    },

    entry: './src/index.js',

    output: {
      filename: 'embed-sdk.js',
      path: path.resolve(__dirname, 'lib'),
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  'babel-plugin-styled-components',
                  {
                    'displayName': false
                  }
                ]
              ],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 2,
                    modules: false,
                    targets: {
                      browsers
                    }
                  }
                ],
                [
                  '@babel/preset-react',
                  {
                    'pragma': 'h',
                    'pragmaFrag': 'Fragment',
                  }
                ]
              ]
            }
          }]
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

    optimization: {
      minimize: true
    },

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
