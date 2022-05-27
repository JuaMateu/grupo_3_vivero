const controller = {
    home: (req, res) => {
        return res.render("home");
    },
    cart: (req,res) => {
        return res.render('shopCart');
    },
}

module.exports = controller