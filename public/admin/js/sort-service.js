function sortSer(type) {
    $.ajax({
        url: '/admin/service-list',
        method: 'get',
        data: { sort: type }
        //dataType: 'json',
        // success: function(data) {
        //     resizeBy.redirect
        // }
        
        //     alert("Delete service successfully!!");
        // },
        // error: function (data) {
        //     alert("Can not delete...");
        // }
    })
    //alert("Delete service successfully!!");
}