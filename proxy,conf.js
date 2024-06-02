const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:44302` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:44302';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
  
  
   ],
    target: target,
    secure: false
  }
]

module.exports = PROXY_CONFIG;
