class UserController {
    home(req,res){
        res.render('users/home',{ title: 'Home' , layout: 'user-layout'});
    }
    checkout(req,res) {
        res.render('users/checkout',{ title: 'Check out', layout: 'user-layout' });
    }
    contact(req,res) {
        res.render('users/contact',{ title: 'Contact', layout: 'user-layout' });
    }
    shopingcart(req,res) {
        res.render('users/shoping-cart',{ title: 'Shoping cart', layout: 'user-layout' });
    }
    shopgrid(req,res) {
        res.render('users/shop-grid',{ title: 'Shop grid', layout: 'user-layout' });
    }
    shopdetails(req,res) {
        res.render('users/shop-details',{ title: 'Shop detail', layout: 'user-layout' });
    }
}

module.exports = new UserController;


// exports.checkout=(req,res)=>{
//     res.render('users/checkout',{ title: 'Check out' });
// }

// exports.contact=(req,res)=>{
//     res.render('users/contact',{ title: 'Contact' });
// }

// exports.shopdetails=(req,res)=>{
//     res.render('users/shop-details',{ title: 'Shop detail' });
// }

// exports.shopgrid=(req,res)=>{
//     res.render('users/shop-grid',{ title: 'Shop grid' });
// }

// exports.shopingcart=(req,res)=>{
//     res.render('users/shoping-cart',{ title: 'Shoping cart' });
// }
