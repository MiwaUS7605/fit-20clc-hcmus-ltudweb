// const laundryService = require('../services/LaundryService');
const createError = require('http-errors');
const qs = require('qs');

class AuthController{
    async showRegistrationForm(req, res){
        res.render('account/sign-up');
    }
    async showLoginForm(req,res){
        res.render('account/sign-in');
    }
    async logout(){}
    async showEditForm(){}
    async register(){}
    async editProfile(){}   
}

module.exports=new AuthController;