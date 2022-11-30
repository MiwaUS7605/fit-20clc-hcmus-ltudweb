const usersRouter = require('./users');
const adminRouter = require('./admin');

function route(app) {

    app.use('/admin', adminRouter);
    app.use('/users', usersRouter);

}
module.exports = route;
