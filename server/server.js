// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === '/assets/style.css') {
        const filePath = path.join(__dirname, 'style.css');

        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading style.css');
            }

            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    } else {
        console.log('Not found ' + req.url + ' ' + req.method);
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
