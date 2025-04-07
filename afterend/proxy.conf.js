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
          //fs.createReadStream('style.css').pipe(resp);
          //const stream = fs.createReadStream('style.css');
          //stream.on('readable', () => {
          //  let chunk;
          //  setTimeout(() => {
          //    while (null !== (chunk = stream.read())) {
          //      resp.write(chunk);
          //    }
          //  }, 1);
          //});
          return request.url;
        } else {
          resp.setHeader('Content-Type', 'text/html; charset=utf-8');
          return '/index.html';
        }
        //const path = 'style.css';
        //fs.createReadStream(path).pipe(resp);
        //
        //const content = fs.readFileSync(path, 'utf-8');
        //resp.end(content);
        //const stream = fs.createReadStream(path);
        //stream.on('readable', () => {
        //  let chunk;
        //  while (null !== (chunk = stream.read())) {
        //    resp.write(chunk);
        //  }
        //});
      } catch (e)
      {
        console.log(e);
      }

    }
  },
};

module.exports = PROXY_CONFIG;
