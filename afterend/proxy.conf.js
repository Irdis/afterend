// proxy.conf.js
const fs = require('fs');
const PROXY_CONFIG = {
  "/": {
    target: "http://localhost:3000",
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
    bypass: function (request, resp, proxyOptions) {
      console.log(request.url);
      try
      {
        if (request.url.toUpperCase().indexOf('.JS') > -1 ||
          request.url.toUpperCase().indexOf('.MJS') > -1 ||
          request.url.toUpperCase().indexOf('VITE') > -1
        ) {
          return request.url;
        } else if (request.url.toUpperCase().indexOf('STYLE.CSS') > -1)
        {
          fs.createReadStream('style.css').pipe(resp);
        } else {
          resp.setHeader('Content-Type', 'text/html; charset=utf-8');
          return '/index.html';
        }
      } catch (e)
      {
        console.log(e);
      }

    }
  },
};

module.exports = PROXY_CONFIG;
