const customerRouter = require('../components/customer');
const usersRouter = require('./users');
const studentRouter = require('../components/students');
const adminRouter = require('../components/admin');


function route(app) {

    app.use('/', customerRouter);
    app.use('/admin', adminRouter);
    app.use('/users', usersRouter);
    app.use('/students', studentRouter);

}
module.exports = route;
