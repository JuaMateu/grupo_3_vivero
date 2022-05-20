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
const httpShop = '/shop'
const httpCart = '/Cart'
const httpProductDetail = '/productDetail'
const httpLogin = '/login'
const httpRegister = '/Register'
const httpUserRecovery = '/userRecovery'
// html
const homeHtml = 'home.html'
const shopHtml = 'shop.html'
const LoginHtml = 'users/login.html'
const RegisterHtml = 'users/Register.html'
const productCartHtml = 'Cart.html'
const productDetailHtml = 'products/productDetail.html'
const userRecoveryHtml = 'users/userRecovery.html'


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