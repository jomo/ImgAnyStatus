var express = require('express');
var logger = require('morgan');
var http = require('http');

var status = code => String(http.STATUS_CODES[code]);

var svg = code => {
  var s = status(code);

  // cheap code to calculate image width
  var codewidth = 87 * code.length;
  var statuswidth = 24 * s.length;
  var width = Math.max(codewidth, statuswidth);

  return '<svg xmlns="http://www.w3.org/2000/svg" style="font-family:monospace;font-size:144px" height="150px" width="' + width + 'px"><text x="0" y="105">' + code + '</text><text x="0" y="135" style="font-size:40px">' + status(code) + '</text></svg>';
};

var app = express();

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.end('Use GET /:status');
});

app.get('/:status', (req, res) => {
  // using plain socket because we don't want express or http to do any magic
  // (e.g. not sending bodies or leaving connections open)
  var sock = res.socket;
  var code = req.params.status || '';
  if (code.match(/^\d+$/)) {
    sock.write('HTTP/1.1 ' + code + ' ' + status(code) + '\r\n');
    sock.write('Content-Type: image/svg+xml\r\n');
    sock.write('Connection: close\r\n');
    sock.write('\r\n');
    sock.end(svg(code));
  } else {
    sock.write('HTTP/1.1 ' + code + ' ' + status(code) + '\r\n');
    sock.write('Content-Type: text/plain\r\n');
    sock.write('Connection: close\r\n');
    sock.write('\r\n');
    sock.end('nope.');
  }
});

app.listen(process.env.PORT || 3000, '0.0.0.0');