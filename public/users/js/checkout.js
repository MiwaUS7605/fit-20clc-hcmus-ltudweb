$(function () {
    $.validator.addMethod("customEmail", function(value, element) { 
        return this.optional( element ) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test( value ); 
      }, "*Please enter valid email address!");

    var $checkoutForm = $('#checkout-form');
    if ($checkoutForm.length) {
        $checkoutForm.validate({
            rules: {
                'first-name': {
                    required: true
                },
                'last-name': {
                    required: true
                },
                'email': {
                    required: true,
                    customEmail: true
                },
                'address-1': {
                    required: true
                },
                'address-2': {
                    required: false
                },
                'phone-number': {
                    required: true,
                }
            },
            messages: {
                email: {
                    required: "*Please enter your email"
                },
                'phone-number': {
                    required: "*Please enter your phone number"
                },
                'address-1': {
                    required: "*This field is required"
                },
                'first-name': {
                    required: "*This field is required"
                },
                'last-name': {
                    required: "*This field is required"
                }
            }
        });
    }
});