const express = require('express');
const app = express();

// Load environment variables
require('dotenv').config();

// Get URL from environment variable
const url = process.env.REDIRECT_URL || 'https://default-url.com';

app.get('*', (req, res) => {
    const userAgent = req.headers['user-agent'] || '';
    const isFacebookApp = /FBAV|FBAN/i.test(userAgent); // Checks if it's Facebook App
    const isInstagramApp = /Instagram/i.test(userAgent); // Checks if it's Instagram App
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent); // Checks if it's iOS
    const isAndroid = /Android/i.test(userAgent);

  if ((isFacebookApp || isInstagramApp) && isIOS) {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Redirecting...</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                    color: #333;
                    margin: 0;
                    display: flex;
                    flex-direction: column; /* Stack content vertically */
                    justify-content: space-between; /* Space out content and footer */
                    min-height: 100vh; /* Ensure body takes the full screen height */
                    box-sizing: border-box;
                }
                .content {
                    max-width: 800px; /* Limit content width */
                    width: 90%; /* Ensure it adapts for smaller screens */
                    margin: 20px auto 0; /* Add space on top, none on bottom */
                    text-align: center;
                }
                h1 {
                    color: #3b5998;
                    font-size: 2.5em;
                    margin-bottom: 20px;
                    text-align: center;
                }
                p {
                    font-size: 1.1em;
                    line-height: 1.6;
                    margin: 10px 0;
                    text-align: center;
                }
                code {
                    background-color: #eef2f7;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 5px 10px;
                    font-family: 'Courier New', Courier, monospace;
                    font-weight: 600; /* Darker font, but not bold */
                    font-size: 1em;
                    display: block;
                    margin: 10px 0;
                    color: #777;
                    word-wrap: break-word;
                }
                .highlight {
                    font-family: 'Courier New', Courier, monospace;
                    color: #777;
                    font-weight: bold;
                }
                a {
                    color: #3b5998;
                    text-decoration: none;
                    font-weight: bold;
                }
                a:hover {
                    text-decoration: underline;
                }
                footer {
                    margin-top: 20px;
                    font-size: 0.9em;
                    color: #666;
                    text-align: center;
                }
                /* Responsive styling for mobile screens */
                @media (max-width: 768px) {
                    body {
                        padding: 10px;
                    }
                    h1 {
                        font-size: 2em;
                    }
                }
            </style>
            <script>
                // Automatically redirect for iOS users in the Facebook or Instagram app
                window.onload = function() {
                    window.location.href = "x-safari-${url}";
                };
            </script>
        </head>
        <body>
            <div class="content">
                <p>Du blir videresendt Safari nettleser 🤖</p>
                <footer>
                    <p>Made by IBH 🌱</p>
                </footer>
            </div>
        </body>
        </html>
    `);
} else if ((isFacebookApp || isInstagramApp) && isAndroid) {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Redirecting...</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                    color: #333;
                    margin: 0;
                    display: flex;
                    flex-direction: column; /* Stack content vertically */
                    justify-content: space-between; /* Space out content and footer */
                    min-height: 100vh; /* Ensure body takes the full screen height */
                    box-sizing: border-box;
                }
                .content {
                    max-width: 800px; /* Limit content width */
                    width: 90%; /* Ensure it adapts for smaller screens */
                    margin: 20px auto 0; /* Add space on top, none on bottom */
                    text-align: center;
                }
                h1 {
                    color: #3b5998;
                    font-size: 2.5em;
                    margin-bottom: 20px;
                    text-align: center;
                }
                p {
                    font-size: 1.1em;
                    line-height: 1.6;
                    margin: 10px 0;
                    text-align: center;
                }
                code {
                    background-color: #eef2f7;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 5px 10px;
                    font-family: 'Courier New', Courier, monospace;
                    font-weight: 600; /* Darker font, but not bold */
                    font-size: 1em;
                    display: block;
                    margin: 10px 0;
                    color: #777;
                    word-wrap: break-word;
                }
                .highlight {
                    font-family: 'Courier New', Courier, monospace;
                    color: #777;
                    font-weight: bold;
                }
                a {
                    color: #3b5998;
                    text-decoration: none;
                    font-weight: bold;
                }
                a:hover {
                    text-decoration: underline;
                }
                footer {
                    margin-top: 20px;
                    font-size: 0.9em;
                    color: #666;
                    text-align: center;
                }
                /* Responsive styling for mobile screens */
                @media (max-width: 768px) {
                    body {
                        padding: 10px;
                    }
                    h1 {
                        font-size: 2em;
                    }
                }
            </style>
            <script>
                // Automatically redirect for Android users in the Facebook or Instagram app
                window.onload = function() {
                    window.location.href = "intent://${url}#Intent;scheme=https;package=com.android.chrome;end";
                };
            </script>
        </head>
        <body>
            <div class="content">
                <p>Du blir videresendt til standard nettleser 🤖</p>
                <footer>
                    <p>Made by IBH 🌱</p>
                </footer>
            </div>
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
