// This setup is only used in local dev mode,
// for vm / staging and production pls refer to deployment folder in the root of the repo
require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  // If you want to connect to local running graphql server please change to related host and port
  // i.e http://localhost:4001/graphql
  const target = process.env.GRAPHQL_API_HOST || 'http://localhost:4001/graphql';
  app.use('/acquiring/graphql', createProxyMiddleware({ target }));
};
