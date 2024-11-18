const express = require('express');
const app = express();

app.get('*', (req, res) => {
    const userAgent = req.headers['user-agent'] || '';
    const isFacebookApp = /FBAV|FBAN/i.test(userAgent); // Checks if it's Facebook App
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent); // Checks if it's iOS
    const url = 'https://script.google.com/macros/s/AKfycbwrh7hhJioUbGhkAnqTlnEgROgDOSuqZNGUFEbDmtyAFM45uWsfaGaHgcaWdl-gCOvZ/exec';

    if (isFacebookApp && isIOS) {
        // Force Safari opening via intermediate page
        res.send(`
            <html>
                <head>
                    <title>Redirecting...</title>
                </head>
                <body>
                    <a 
                      href="x-safari-${url}" 
                      target="_blank">
                      Meld deg på
                    </a>
                </body>
            </html>
        `);
    } else {
        // Regular redirect
        res.send(`
            <html>
                <head>
                    <title>Redirecting...</title>
                </head>
                <body>
                    <a 
                      href="intent://${url}#Intent;scheme=https;end" 
                      target="_blank">
                      Open Browser
                    </a>
                </body>
            </html>
        `);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
