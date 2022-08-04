const db = require ('../database/models')
const sequelize = db.sequelize;

let Products = db.Product
console.log(Products)

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
                console.log("hubo un error")
            })


    },
    cart: (req,res) => {
        return res.render('shopCart');
    },
}

module.exports = controller