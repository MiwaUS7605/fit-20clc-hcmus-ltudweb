class AdminController {
    //[GET] /
    dashboard(req,res) {
        res.render('admin/dashboard', {layout: 'admin-layout'});
    }
    //[GET] /admin/revenue
    revenue(req, res) {
        res.render('admin/revenue', {layout: 'admin-layout'});
    }
    //[GET] /admin/list
    history(req, res) {
        res.render('admin/order-history', {layout: 'admin-layout'});
    }
    chat(req,res) {
        res.render('admin/chat', {layout: 'admin-layout'});
    }
    feedback(req,res) {
        res.render('admin/feedback', {layout: 'admin-layout'});
    }
    location(req,res) {
        res.render('admin/google-map', {layout: 'admin-layout'});
    }
    signin(req,res) {
        res.render('admin/signin', {layout: 'admin-layout'});
    }
    signup(req,res) {
        res.render('admin/signup', {layout: 'admin-layout'});
    }
    customerList(req,res) {
        res.render('admin/customer-list', {layout: 'admin-layout'});
    }
}
module.exports = new AdminController;
