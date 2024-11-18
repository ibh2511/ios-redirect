const express = require('express');
const app = express();

app.get('*', (req, res) => {
    const userAgent = req.headers['user-agent'] || '';
    const isFacebookApp = /FBAV|FBAN/i.test(userAgent); // Checks if it's Facebook App
    const isInstagramApp = /Instagram/i.test(userAgent); // Checks if it's Instagram App
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent); // Checks if it's iOS
    const url = 'https://script.google.com/macros/s/AKfycbwrh7hhJioUbGhkAnqTlnEgROgDOSuqZNGUFEbDmtyAFM45uWsfaGaHgcaWdl-gCOvZ/exec';


    // if ((isFacebookApp || isInstagramApp) && isIOS) {
    if (isFacebookApp && isIOS) {
        // Force Safari opening via intermediate page with auto redirect
        res.send(`
            <html>
                <head>
                    <title>Redirecting...</title>
                    <script>
                        // Automatically redirect for iOS users in the Facebook app
                        window.onload = function() {
                            window.location.href = "x-safari-${url}";
                        };
                    </script>
                </head>
                <body>
                    <p>Redirecting...</p>
                    <noscript>
                        <a href="x-safari-${url}" target="_blank">Meld deg på</a>
                    </noscript>
                </body>
            </html>
        `);
    } else {
        // Regular redirect for other users
        res.redirect(url);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
