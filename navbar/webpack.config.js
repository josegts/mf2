const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:3001/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3001,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "navbar",
      library: { type: 'var', name: 'navbar' },
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./TailwindCss": "./src/index.css",
        "./Navbar": "./src/components/Navbar",
        "./Button": "./src/components/Button",
      },
      shared: ['react', 'react-dom', 'tailwindcss'],
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
