$(function () {
    var $createServiceForm = $('#create-service-form');
    if ($createServiceForm.length) {
        $createServiceForm.validate({
            rules: {
                name: {
                    required: true
                },
                price: {
                    required: true
                },
            },
            messages: {
                name: {
                    required: "*Please enter service name"
                },
                price: {
                    required: "*Please enter service price"
                },
            }
        })
    }
})