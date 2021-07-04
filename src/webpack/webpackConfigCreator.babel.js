
import Path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Webpack from 'webpack';
import ImageminWebpack from 'image-minimizer-webpack-plugin';

export default (env, options) => {
  const NODE_ENV = JSON.stringify(env.NODE_ENV === 'development' ? 'development' : 'production');
  return {
    entry: {
      app: ['./src/react-app/index.jsx']
    },
    output: {
      path: Path.resolve('build'),
      filename: `scripts/${options.jsFileName}`,
      publicPath: './'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './src/react-app/index.html' }),
      new Webpack.DefinePlugin({ 'process.env': { NODE_ENV } }),
      new ImageminWebpack({
        minimizerOptions: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            [
              'svgo',
              {
                plugins: [
                  {
                    removeViewBox: false
                  }
                ]
              }
            ]
          ]
        }
      })
    ],
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: [/node_modules/, /config\.json$/]
        }
      ]
    },
    mode: NODE_ENV
  };
};