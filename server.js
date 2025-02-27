const https = require('https');
const fs = require('fs');

https.createServer({
    cert: fs.readFileSync('./localhost.crt'),
    key: fs.readFileSync('./localhost.key')
}, (req, res) => {
    res.writeHead(200);
    res.end('Hello from Node!\n');
}).listen(4430);
console.log("Server listening on https://localhost:4430/");