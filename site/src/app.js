const express = require('express');
const app = express();
const path = require('path');

const port = 3000

//routers
const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const administratorRoutes = require('./routes/administratorRoutes');



// Define the static file path
app.use(express.static(path.join(__dirname, "..", "public")))

// determina la direccion de views adentro de la carpeta src
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    console.log(__dirname)
})


//rutas
app.use("/", mainRoutes);
app.use('/users/', usersRoutes);
app.use('/products/', productsRoutes);
app.use('/administrator/',administratorRoutes);

// app.use(httpHome, mainRoutes);



// app.get(httpCart, (req, res) => {
//     res.sendFile(path.join(views, productCartHtml))
// })
// app.get(httpProductDetail, (req, res) => {
//     res.sendFile(path.join(views, productDetailHtml))
// })
// app.get(httpRegister, (req, res) => {
//     res.sendFile(path.join(views, RegisterHtml))
// })

// app.get(httpUserRecovery, (req, res) => {
//     res.sendFile(path.join(views, userRecoveryHtml))
// })



// app.get(httpRaiz, (req, res) => {
//     res.sendfile(path.join(views, homeHtml))
// })
// app.get(httpHome, (req, res) => {
//     res.sendFile(path.join(views, homeHtml))
// })
// app.post(httpHome, (req, res) => {
//     res.sendFile(path.join(views, homeHtml))
// })
// app.get(httpLogin, (req, res) => {
//     res.sendFile(path.join(views, LoginHtml))
// })

// app.get(httpShop, (req, res) => {
//     res.sendFile(path.join(views, shopHtml))
// })