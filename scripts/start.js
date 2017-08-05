const runBackend = require('./run');
const webpackConfigBackend = require('../config/webpack.config');
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';
runBackend(webpackConfigBackend);
