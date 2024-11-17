const express = require('express');
const app = express();

app.get('*', (req, res) => {
    const userAgent = req.headers['user-agent'] || '';
    const isFacebookApp = /FBAV|FBAN/i.test(userAgent); // Sjekker om det er Facebook App
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent); // Sjekker om det er iOS

    if (isFacebookApp && isIOS) {
        // Tving Safari-åpning via mellomside
        res.send(`
            <html>
                <head>
                    <title>Redirecting...</title>
                </head>
                <body>
                    <script>
                        window.location.href = "https://tinyurl.com/Juletreff2024";
                    </script>
                </body>
            </html>
        `);
    } else {
        // Vanlig omdirigering
        res.redirect('https://tinyurl.com/Juletreff2024');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
