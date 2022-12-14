const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const authService = require('./AuthService');
const registerSchema = require('./schemas/register');

const ajv = new Ajv();
addFormats(ajv);

const createError = require('http-errors');
const qs = require('qs');

const bcrypt = require('bcryptjs');

class AuthController{
    async showRegistrationForm(req, res){
        res.render('account/sign-up');
    }
    async showLoginForm(req,res){
        res.render('account/sign-in');
    }

    async logout(req,res)
    {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    }

    async showEditForm(req,res){
      // const user = await authService.getUserByEmail(req.user.email);
      res.render('account/edit');
    }
    async register(req,res){
        if (!ajv.validate(registerSchema, req.body)) {
            let message = "Invalid input! Try again!";
            if (req.body.password != req.body.confirmpassword && !req.body.password && !req.body.confirmpassword) {
              message = "Confirm password does not match. Try again!";
            }
            res.render('account/sign-up', { error: message });
            return;
          }
          const { name, email, password,confirmpassword,phonenumber,address } = req.body;
          try {
            await authService.register(name, phonenumber, address, email, password);
          } catch (e) {
            res.render('account/sign-up', { error: e.message });
            return;
          }
          res.redirect('/users/auth/login');
    };
    async editProfile(req,res) {

      let { name, old_password, new_password, phonenumber,address } = req.body;
          try {
            console.log(res.locals.user);

            name = name ? name : res.locals.user.name;
            new_password = new_password ? new_password : res.locals.user.password;
            address = address ? address : res.locals.user.address;
            phonenumber = phonenumber ? phonenumber : res.locals.user.phonenumber;
            await authService.editProfile(name, phonenumber,address, new_password, res.locals.user);
            // if (bcrypt.compare(old_password, user.password)) {
            // }
            // else{
            //   res.render('account/edit', { error: 'Wrong password!' });
            //   return;
            // }
            let email = res.locals.user.email;
            res.locals.user = {name, email, new_password, address, phonenumber};

            console.log(res.locals.user);
          } catch (e) {
            res.render('account/edit', { error: e.message });
            return;
          }
      res.redirect('/');
    }   
}

module.exports=new AuthController;