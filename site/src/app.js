const express = require('express');
const app = express();
const path = require('path');

const port = 3000

// views
const views = path.join(__dirname, 'view/')
// public
const public = path.join(__dirname, '/public/')
// http routes
const httpRaiz = '/'
const httpHome = '/home'
const httpLogin = '/login'
const httpCart = '/productCart'
const httpProductDetail = '/productDetail'
const httpRegister = '/Register'
const httpShop = '/shop'
const httpUserRecovery = '/userRecovery'
// html
const homeHtml = 'home.html'
const LoginHtml = 'login.html'
const productCartHtml = 'productCart.html'
const productDetailHtml = 'productDetail.html'
const RegisterHtml = 'Register.html'
const shopHtml = 'shop.html'
const userRecoveryHtml = 'userRecovery.html'


// Define the static file path
app.use(express.static(path.join(__dirname , '..' , 'public')));


app.get(httpRaiz, (req, res) => {
    res.sendFile(path.join(views, homeHtml))
})
app.post(httpHome, (req, res) => {
    res.sendFile(path.join(views, homeHtml))
})
app.get(httpHome, (req, res) => {
    res.sendFile(path.join(views, homeHtml))
})
app.get(httpLogin, (req, res) => {
    res.sendFile(path.join(views, LoginHtml))
})
app.get(httpCart, (req, res) => {
    res.sendFile(path.join(views, productCartHtml))
})
app.get(httpProductDetail, (req, res) => {
    res.sendFile(path.join(views, productDetailHtml))
})
app.get(httpRegister, (req, res) => {
    res.sendFile(path.join(views, RegisterHtml))
})
app.get(httpShop, (req, res) => {
    res.sendFile(path.join(views, shopHtml))
})
app.get(httpUserRecovery, (req, res) => {
    res.sendFile(path.join(views, userRecoveryHtml))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    console.log(__dirname)
})