const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const session = require('express-session');
const cookies = require('cookie-parser');

const port = 3000

// .ENV
require('dotenv').config();

// Routers
const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');

//Middlewares
const userFoundMiddleware = require('./middlewares/userFoundMiddleware');

// Express Session
app.use(session({
    secret: "Shhh, I'm a secret message",
    resave: false,
    saveUninitialized: false
}));

// Cookies
app.use(cookies());

// Header Adjustments
app.use(userFoundMiddleware);

// Definir la ruta de archivos estaticos a nivel aplicacion
app.use(express.static(path.join(__dirname, "..", "public")))
// Utilizar los metodos HTTP 'PUT' y 'DELETE'
app.use(methodOverride ("_method"))
// Capturar la informacion proveniente del formulario en forma de un objeto literal
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
// Definir el motor de vistas que va a ser utilizado a nivel aplicacion
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    console.log(__dirname)
})

// Rutas
app.use("/", mainRoutes);

app.use('/users/', usersRoutes);
app.use('/products/', productsRoutes);

// Error Handling
app.use((req, res, next) => {
    res.status(404).render("error404");
});
