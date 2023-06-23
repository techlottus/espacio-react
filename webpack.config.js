module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: {
            mode: "global",
          },
        },
      },
    ],
  },
};