const usersRouter = require('./users');
const adminRouter = require('./admin');
const servicesRouter = require('../components/services');
const authRouter=require('../components/auth');

function route(app) {

    //route to users/home
    app.get('/:slug', function(req,res) {
        res.redirect('/users/home');
    })
    
    // app.get('/', function(req,res) {
    //     res.redirect('/users/home');
    // })
     
    app.use('/admin', adminRouter);
    app.use('/users', usersRouter);
    app.use('/users/services', servicesRouter);
    app.use('/users/auth', authRouter);

}
module.exports = route;
