const fs = require('fs');

const db = require("../database/models");

const controller = {
    list: (req, res) => {
        // READ
        db.Product.findAll()
            .then((prodcutos) => {
                console.log(prodcutos);
            });
    },

}

module.exports = controller