const db = require ('../database/models')
const sequelize = db.sequelize;

let Products = db.Product

const controller = {
    home: (req, res) => {
        Products.findAll({
            where: {
                label: "Mas Vendida"
            }
        })
            .then(Product =>{
                return res.render("home" , { products : Product});
            })
            .catch(err=>{
                res.send('No se pudo cargar la pagina principal, chequear conexion con base de datos')
            })
    },
    cart: (req,res) => {
        return res.render('shopCart');
    },
}

module.exports = controller