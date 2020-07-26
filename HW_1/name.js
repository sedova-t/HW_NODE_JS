const http = require('http');
const fs = require('fs');


http.createServer((request, response) => {
    // console.log("HTTP works");
    // response.writeHead(200, {'Content-Type':'text/html'});
    // response.write('<h1>Hello</h1>');
    // response.end();

    // fs.readFile('index.html', 'utf8',(err, data) =>{
    //     if (err){
    //         console.log('Could not find or open file for reading\n');
    //         response.statusCode = 404;
    //         response.end();
    //     } else {
    //         console.log(`The file index.html is read and sent to the client\n`);
    //         response.writeHead(200, {'Content-Type':'text/html'});
    //         response.end(data);
    //     }
    // });

    let header = fs.readFileSync('header.html', 'utf8');
    let footer = fs.readFileSync('footer.html', 'utf8');
    let body = fs.readFileSync('body.html', 'utf8');

    response.writeHead(200,  {'Content-Type':'text/html'});
    response.write(header + body + footer);
    response.end();

}).listen(8082, () => {
    console.log("HTTP server works in 8080 port!\n");
});
console.log('http://localhost:8082');
