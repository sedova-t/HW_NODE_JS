let http = require('http');
let fs = require("fs");

http.createServer((request, response) => {
    if (request.url === "/") {
        let index = fs.readFileSync('index.html', 'utf8');
        response.writeHead(200,  {'Content-Type':'text/html'});
        response.write(index);
    } else if (request.url.indexOf("/get-ajax") === 0) {
        let ajax = fs.readFileSync('ajax.html', 'utf8');
        response.writeHead(200,  {'Content-Type':'text/html'});
        response.write(ajax);
    } else {
        response.writeHead(404,  {'Content-Type':'text/html'});
        response.write('Проблема с сервером');
    }


    response.end();

}).listen(8085, () => {
    console.log("HTTP server works in 8080 port!\n");
});
console.log('http://localhost:8085');
