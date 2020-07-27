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
    let extname, mimeType;

    if (request.url === '/') {
        pathname = 'site/index.html';
    } else {
        pathname = 'site' + request.url;
        extname = path.extname(pathname);
        mimeType = mimeTypes[extname];
    }


    console.log("Request: " + request.url);

    if (extname === ".jpg" || extname === ".gif" || extname === ".png") {
        try {
            let img = fs.readFileSync(pathname);
            console.log(`The file ${pathname} is read and sent to the client\n`);
            response.writeHead(200, {'Content-Type': mimeType});
            response.end(img);
        } catch (e) {
            console.log('Could not find or open file for reading\n');
            response.statusCode = 404;
            response.end();
        }
    } else {
        fs.readFile(pathname, 'utf8', (err, data) => {
            if (err) {
                console.log(`Could not find or open file ${pathname} for reading\n`);
                response.statusCode = 404;
                response.end();
            } else {
                console.log(`The file ${pathname} is read and sent to the client\n`);
                response.writeHead(200, {'Content-Type': mimeTypes[path.extname(pathname)]});
                response.end(data);
            }
        })
    }
}).listen(port, () => {
    console.log(`HTTP server works in ${port} port!\n`);
    console.log(`http://localhost:${port}`);
})
