const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    home: (req, res) => {
        let topSellers = products.filter(prod => {return prod.label === "Mas Vendida"})
        return res.render("home" , { products : topSellers});
    },
    cart: (req,res) => {
        return res.render('shopCart');
    },
}

module.exports = controller