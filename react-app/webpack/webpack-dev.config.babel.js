// eslint-disable-next-line
import Webpack from 'webpack';
import Path from 'path';
import webpackConfigCreator from './webpackConfigCreator.babel';

export default env => {
  const port = Number.parseInt(env.PORT);

  const options = {
    isProduction: false,
    devtool: 'inline-source-map',
    jsFileName: '[name].js',
    cssFileName: '[name].css',
    port: !Number.isNaN(port) ? port : '5000',
    performance: {
      hints: 'warning'
    }
  };

  const webpackConfig = {
    ...webpackConfigCreator(env, options),
    devServer: {
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        https: true
      },
      contentBase: Path.join(__dirname, '../'),
      watchContentBase: true,
      watchOptions: {
        poll: true
      },
      hot: true,
      port: options.port,
      inline: true,
      progress: false,
      historyApiFallback: true
    },
    mode: 'development'
  };
  webpackConfig.output.publicPath = '/';

  // Push configs
  webpackConfig.module.rules.push(
    {
      test: /\.css$/,
      use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'resolve-url-loader'
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    },
    {
      test: /\.(png)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].png'
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
            name: '[path][name].[ext]'
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
  webpackConfig.plugins.push(new Webpack.HotModuleReplacementPlugin());

  return webpackConfig;
};