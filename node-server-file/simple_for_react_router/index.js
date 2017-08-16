/*jshint esversion: 6 */
/*jshint -W058 */

const PORT = 3456,
  http = require('http'),
  fs = require('fs'),
  mimetypes = {
    "html": "text/html",
    "js": "text/javascript",
    "css": "text/css"
  },
  serveStaticFile = (res, path, responseCode) => {
    const ext = path.substr(path.lastIndexOf('.') + 1);
    if (!responseCode) responseCode = 200;

    fs.readFile(__dirname + path, (err, data) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end('500 - Internal Error');
      } else {
        res.writeHead(responseCode, {
          'Content-Type': mimetypes[ext]
        });
        res.end(data);
      }
    });
  };

http.createServer((req, res) => {
  const needle = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  switch (needle) {
    case '/styles.css':
    case '/bundle.js':
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      serveStaticFile(res, needle, '');
      break;
    default:
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      serveStaticFile(res, '/index.html', '');
  }

}).listen(process.env.PORT || PORT, () =>
  console.log(`--> Port ${  process.env.PORT || PORT  } listening!`)
);
