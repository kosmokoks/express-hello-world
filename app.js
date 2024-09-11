const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;
const fs = require('fs');

app.get('/apple-app-site-association', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(__dirname + '/apple-app-site-association');
});
//
// app.use("/.well-known", express.static(path.join(__dirname, ".well-known")));
// app.get("/.well-known/apple-app-site-association", (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.sendFile( path.join(__dirname, ".well-known/apple-app-site-association"));
// });

app.get('/.well-known/apple-app-site-association', (req, res) => {
    const filePath = path.join(__dirname, '.well-known', 'apple-app-site-association');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Błąd odczytu pliku:', err);
            return res.status(500).send('Błąd serwera');
        }

        res.set({
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff'
        });

        res.removeHeader('X-Powered-By');
        res.removeHeader('Content-Disposition');

        // Logowanie nagłówków
        console.log('Nagłówki odpowiedzi:', res._headers);

        res.send(data);
    });
});

app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
  <head>
      <meta name="apple-app-site-association" content="./apple-app-site-association">
 
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
    <a href="selmoapp://product/984957/5?fromSelmo=1">Go to app</a>
      Hello from Render!
    </section>
  </body>
</html>
`
