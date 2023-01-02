$(function () {
    $.validator.addMethod("validatePassword", function (value, element, param) {
        return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,255}$/i.test(value);
    }, "*Please enter a password at least 6 characters including uppercase, lowercase letters and at least one number");

    $.validator.addMethod("customEmail", function(value, element) { 
        return this.optional( element ) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test( value ); 
      }, "*Please enter valid email address!");

    var $registerForm = $('#register-form');
    if ($registerForm.length) {
        $registerForm.validate({
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true,
                    customEmail: true
                },
                password: {
                    required: true,
                    validatePassword: true
                },
                confirmpassword: {
                    required: true,
                    equalTo: '#password'

                },
                address: {
                    required: false,
                },
                phonenumber: {
                    required: true,
                }
            },
            messages: {
                name: {
                    required: "*Please enter your username"
                },
                email: {
                    required: "*Please enter your email"
                },
                password: {
                    required: "*Please enter your password"
                },
                confirmpassword: {
                    required: "*Please confirm your password",
                    equalTo: "*The password you entered is not match the one you entered"
                },
                phonenumber: {
                    required: "*Please enter your phone number"
                }
            }
        })
    }
})