# ImgAnyStatus

Minimalistic web server that serves images using any requested HTTP status

---

## API

* `GET /200` returns an image using status code 200.
* `GET /500` returns an image using status code 500.
* `GET /404` returns an image using status code 404.
* You get the idea

## Image
The picture itself is a plain-text SVG image with a big status *code* and the status *message* below.
![example](https://i.imgur.com/SyuEcX2.png)

## Note
* Only numeric status codes are accepted.
* The server does not respect any HTTP rules and always sends a body, then closes the connection.
* The status message is taken from [`http.STATUS_CODES`](https://iojs.org/api/http.html#http_http_status_codes).

## Run
```shell
npm install
npm start
```

## See also

http://httpstatus.es // [@citricsquid/httpstatus.es](https://github.com/citricsquid/httpstatus.es)