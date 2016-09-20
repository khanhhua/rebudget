var path = require("path");  
var webpack = require('webpack');
var config = require('./webpack.config');

config.entry = ['./src/index.jsx'];
config.output.path = __dirname + '/dist';
config.plugins = [
  new webpack.EnvironmentPlugin(['NODE_ENV'])
];

module.exports = config;