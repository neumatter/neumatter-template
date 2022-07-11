import * as nodePath from 'path'
import { cwd } from 'process'

const isDev = process.env.NODE_ENV !== 'production'

export default {
  mode: isDev ? 'development' : 'production',
  entry: './client-src/neumatter.js',
  devtool: isDev ? 'inline-source-map' : 'source-map',
  output: {
    filename: 'neumatter.js',
    path: nodePath.resolve(cwd(), 'public', 'js')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env', {
                  targets: {
                    esmodules: true
                  },
                bugfixes: true,
                  modules: false
                }
              ]
            ]
          }
        }
      }
    ]
  }
}