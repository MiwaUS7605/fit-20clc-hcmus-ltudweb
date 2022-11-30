class AdminController {
    //[GET] /admin
    dashboard(req,res) {
        res.render('admin/dashboard');
    }
    //[GET] /admin/revenue
    revenue(req, res) {
        res.render('admin/revenue');
    }
    //[GET] /admin/list
    list(req, res) {
        res.render('admin/list');
    }

}

module.exports = new AdminController;
