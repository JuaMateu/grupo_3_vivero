const controller = {
    home: (req, res) => {
        return res.render("home");
    },
    cart: (req,res) => {
        return res.render('shopCart');
    },
    shop: (req,res) => {
        return res.render('shop');
    },
}

module.exports = controller