const http = require('http');
const fs = require('fs');

let port = 8085;
const path = require('path');
let mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.png': 'image/png',
};


http.createServer((request, response) => {
    let pathname = '';

    if (request.url === '/') {
        pathname = 'index.html';
    } else if(request.url === '/get-users') {
        fs.readFile('./users.json', 'utf8', (err, data) => {
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(data);
        });
    } else {
        pathname = '.' + request.url;
    }

    fs.readFile(pathname, 'utf8', (err, data) => {
        if (!err) {
            response.writeHead(200, {'Content-Type': mimeTypes[path.extname(pathname)]});
            response.end(data);
        }
    });


}).listen(port, () => {
    console.log(`HTTP server works in ${port} port!\n`);
    console.log(`http://localhost:${port}`);
})
