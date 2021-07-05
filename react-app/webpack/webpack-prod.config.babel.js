import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import webpackConfigCreator from './webpackConfigCreator.babel';

const options = {
  isProduction: true,
  devtool: false,
  jsFileName: '[name].[chunkhash].js',
  cssFileName: '[name].[chunkhash].css'
};

export default env => {
  const webpackConfig = {
    ...webpackConfigCreator(env, options),
    mode: 'production'
  };

  webpackConfig.module.rules.push(
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    },
    {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    },
    {
      test: /\.(png)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].png',
            outputPath: 'img/',
            publicPath: '/img/'
          }
        },
        {
          loader: 'image-process-loader',
          options: {
            ensureAlpha: true
          }
        }
      ]
    },
    {
      test: /\.(gif|jpe?g|tiff?|webp)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: '/img/'
          }
        },
        {
          loader: 'image-process-loader',
          options: {
            jpeg: {
              progressive: true
            }
          }
        }
      ]
    }
  );
  webpackConfig.plugins.push(new MiniCssExtractPlugin());
  webpackConfig.optimization.minimizer = [new TerserPlugin()];

  return webpackConfig;
};