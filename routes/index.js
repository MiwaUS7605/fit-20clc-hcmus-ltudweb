const usersRouter = require('./users');
const adminRouter = require('./admin');
const servicesRouter = require('../components/services');

function route(app) {

    //route to users/home
    app.get('/:slug', function(req,res) {
        res.redirect('/users/home');
    })
    
    app.get('/', function(req,res) {
        res.redirect('/users/home');
    })
     
    app.use('/admin', adminRouter);
    app.use('/users', usersRouter);
    app.use('/users/services', servicesRouter);

}
module.exports = route;
