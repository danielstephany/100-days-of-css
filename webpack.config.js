const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = {
  index: "./src/index",
  day5: './src/day5/index.js',
  day6: './src/day6/index.js'
}

const getHtml = () => {
  htmlWebpackPlugins = []

  Object.entries(entry).forEach(([key, value]) => {
    if(key === "index"){
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          title: "home",
          filename: path.resolve(__dirname, 'dist/index.html'),
          template: path.resolve(__dirname, 'src/index.html'),
          chunks: [key]
        })
      )
    } else {
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          title: key,
          filename: path.resolve(__dirname, "dist" + "/" + key +'/index.html'),
          template: path.resolve(__dirname, "src/" + key + '/index.html'),
          chunks: [key]
        })
      )
    }
  })

  return htmlWebpackPlugins
}

module.exports = env => ({
  entry,
  output: {
    publicPath: '/',
    filename: '[name]/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: env.development ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      },
      {
        test: /\.(css|scss|sass)$/i,
        use: ['style-loader', 'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
          }},
          "sass-loader"
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    ...getHtml()
  ],
  devServer: {
    //historyApiFallback allows the react router to work properly
    historyApiFallback: true,
    static: {
        directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    hot: true
  },
});