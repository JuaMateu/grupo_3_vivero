const express = require('express');
const app = express();
const path = require('path');

const port = 3000

// views
const views = path.join(__dirname, 'view/')
// public
const public = path.join(__dirname, 'public/')
// http routes
const httpRaiz = '/'
const httpHome = '/home'
// html
const homeHtml = 'home.html'

// Define the static file path
app.use(express.static(__dirname +'/public/'));

app.get(httpRaiz, (req, res) => {
    res.sendFile(path.join(views, homeHtml))
})

app.get(httpHome, (req, res) => {
    res.sendFile(path.join(views, homeHtml))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    console.log(__dirname)
})