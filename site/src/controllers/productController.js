const controller = {
    detail: (req, res) => {
        return res.render("products/productDetail");
    },
    list: (req, res) => {
        return res.render("products/productList");
    },
    add:(req,res)=> {
        return res.render("products/addProducts");
    },
    edit:(req,res)=> {
        return res.render("products/editProducts");
    },
    delete:(req,res)=> {
        return res.render("products/editProducts");
    }
    
}

module.exports = controller