var path = require("path");  
var webpack = require('webpack');

module.exports = {  
 entry: [
   'webpack-dev-server/client?http://localhost:8080',
   // 'webpack/hot/only-dev-server',
   './src/index.jsx'
 ],
 module: {
   loaders: [{
     test: /\.jsx?$/,
     exclude: /node-modules/,
     include: path.join(__dirname, "src"),
     loader: 'babel'
   }]
 },
 resolve: {
   extensions: ['', '.js', '.jsx']
 },
 output: {
   path: __dirname + '/debug',
   publicPath: '/',
   filename: 'bundle.js'
 },
 devServer: {
   contentBase: ['./dist', './src']
 },
 plugins: [
   new webpack.EnvironmentPlugin(['NODE_ENV', 'API_PREFIX'])
 ]
};