const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')

const port = 3000

//routers
const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');



// Define the static file path
app.use(express.static(path.join(__dirname, "..", "public")))
// method override para post
app.use(methodOverride ("_method"))
// seteo para copturar informacion formulario post en forma de objeto literal
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
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


app.use((req,res,next)=>{
    res.status(404).render("error404")
});
