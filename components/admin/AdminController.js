class AdminController {
    //[GET] /admin
    index(req,res) {
        res.render('admin/dashboard');
    }

    //[GET] /admin/:slug
    show(req, res) {
        res.send("DEEPER");
    }

}

module.exports = new AdminController;
