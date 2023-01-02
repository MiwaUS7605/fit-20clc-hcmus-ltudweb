$(function () {
    $.validator.addMethod("validatePassword", function (value, element, param) {
        return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,255}$/i.test(value);
    }, "*Please enter a password at least 6 characters including uppercase, lowercase letters and at least one number");

    $.validator.addMethod("customEmail", function(value, element) { 
        return this.optional( element ) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test( value ); 
      }, "Please enter valid email address!");

    var $loginForm = $('#login-form');
    if ($loginForm.length) {
        $loginForm.validate({
            onfocusout: false,
            onkeyup: false,
            onclick: false,

            rules: {
                email: {
                    required: true,
                    customEmail: true
                },
                password: {
                    required: true,
                    validatePassword: true
                }
            },
            messages: {
                email: {
                    required: "Please enter your email"
                },
                password: {
                    required: "Please enter your password"
                }
            }
        })
    }
})