const { Sequelize } = require('../database/models');
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
    aboutUs: (req,res) => {
        return res.render("aboutUs");
    },
    search: async (req,res) => {
        let search = req.query.searched;
        console.log(search)
        let products = await Products.findAll({
            where: {
                name: {[db.Sequelize.Op.like] : `%${search}%`}
        }})

            return res.render('products/shop', {products})
    }
}

module.exports = controller