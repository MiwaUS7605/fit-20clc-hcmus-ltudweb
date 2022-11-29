class CustomerController {
    //[GET] /admin
    index(req,res) {
        res.render('customer/home');
    }

    //[GET] /admin/:slug
    show(req, res) {
        res.send("DEEPER");
    }

}

module.exports = new CustomerController;
