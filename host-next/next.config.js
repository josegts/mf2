/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options){
    console.log(options.isServer)
    config.module.rules.push(
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // tailwindcss
      {
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('tailwindcss'), require('autoprefixer')],
              },
            },
          },
        ],
      }
    );
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'host-next',
          remotes: {
            navbar: 'navbar@http://localhost:3001/remoteEntry.js',
          },
          filename: 'static/chunks/remoteEntry.js',
          exposes: {},
          shared: ['react', 'react-dom', 'tailwindcss'],
          extraOptions: {
            skipSharingNextInternals: true,
          },
        })
      )
    }
    return config
  }
}

module.exports = nextConfig
