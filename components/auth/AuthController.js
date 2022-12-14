const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const authService = require('./authService');
const registerSchema = require('./schemas/register');

const ajv = new Ajv();
addFormats(ajv);

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
    async register(req,res){
        if (!ajv.validate(registerSchema, req.body)) {
            res.render('auth/sign-up', { error: 'Invalid input!' });
            return;
          }
          const { name, email, password,confirmpassword,phonenumber,address } = req.body;
          try {
            await authService.register(name, email, password,confirmpassword,phonenumber,address);
          } catch (e) {
            res.render('auth/sign-up', { error: e.message });
            return;
          }
          res.redirect('/');
    };
    async editProfile(){}   
}

module.exports=new AuthController;