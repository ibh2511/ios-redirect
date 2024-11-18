const express = require('express');
const app = express();

app.get('*', (req, res) => {
    const userAgent = req.headers['user-agent'] || '';
    const isFacebookApp = /FBAV|FBAN/i.test(userAgent); // Check if the request comes from Facebook App
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent); // Check if the device is iOS

    if (isFacebookApp && isIOS) {
        // Serve a page that forces the link to open in Safari
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Redirecting...</title>
                <meta http-equiv="refresh" content="0; url=https://script.google.com/macros/s/AKfycbwrh7hhJioUbGhkAnqTlnEgROgDOSuqZNGUFEbDmtyAFM45uWsfaGaHgcaWdl-gCOvZ/exec">
                <script>
                    // Ensure the link opens in Safari if the meta refresh fails
                    setTimeout(() => {
                        window.location.replace("https://script.google.com/macros/s/AKfycbwrh7hhJioUbGhkAnqTlnEgROgDOSuqZNGUFEbDmtyAFM45uWsfaGaHgcaWdl-gCOvZ/exec");
                    }, 1000);
                </script>
            </head>
            <body>
                <noscript>
                    <p>Redirecting to <a href="https://script.google.com/macros/s/AKfycbwrh7hhJioUbGhkAnqTlnEgROgDOSuqZNGUFEbDmtyAFM45uWsfaGaHgcaWdl-gCOvZ/exec">Juletreff 2024</a>...</p>
                </noscript>
            </body>
            </html>
        `);
    } else {
        // Directly redirect to the URL for all other cases
        res.redirect('https://script.google.com/macros/s/AKfycbwrh7hhJioUbGhkAnqTlnEgROgDOSuqZNGUFEbDmtyAFM45uWsfaGaHgcaWdl-gCOvZ/exec');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
