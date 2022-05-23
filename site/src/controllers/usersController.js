const controller = {
    login: (req, res) => {
        res.render("users/login");
    },
    register: (req, res) => {
        return res.render("users/register");
    },
    userRecovery: (req, res) => {
        return res.render("users/userRecovery");
    },
    
}

module.exports = controller