const express = require('express');
const app = express();

app.get('*', (req, res) => {
    const userAgent = req.headers['user-agent'] || '';
    const isFacebookApp = /FBAV|FBAN/i.test(userAgent); // Sjekker om det er Facebook App
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent); // Sjekker om det er iOS
    const url = 'https://script.google.com/macros/s/AKfycbwrh7hhJioUbGhkAnqTlnEgROgDOSuqZNGUFEbDmtyAFM45uWsfaGaHgcaWdl-gCOvZ/exec';

    if (isFacebookApp && isIOS) {
        // Tving Safari-åpning via mellomside
        res.send(`
            <html>
                <head>
                    <title>Redirecting...</title>
                </head>
                <body>
                  /*  <script>
                        window.location.href = `x-safari-${url}`;
                    </script>*/
                    <a 
                      href="x-safari-https://script.google.com/macros/s/AKfycbwrh7hhJioUbGhkAnqTlnEgROgDOSuqZNGUFEbDmtyAFM45uWsfaGaHgcaWdl-gCOvZ/exec" 
                      target="_blank">
                      Meld deg på
                    </a>
                </body>
            </html>
        `);
    } else {
        // Vanlig omdirigering
       // res.redirect(url);
        <html>
            <head>
                <title>Redirecting...</title>
            </head>
            <body>
                <a 
                  href="intent://script.google.com/macros/s/AKfycbwrh7hhJioUbGhkAnqTlnEgROgDOSuqZNGUFEbDmtyAFM45uWsfaGaHgcaWdl-gCOvZ/exec#Intent;scheme=https;end" 
                  target="_blank">
                  Open Browser
                </a>
            </body>
        </html>

    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
