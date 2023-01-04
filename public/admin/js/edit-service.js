function editSer(idservice) {
    alert(idservice);
    $.ajax({
        url: '/admin/service-list/edit',
        method: 'get',
        data: { idservice: idservice },
        dataType: 'json'
        // success: function (data) {
        //     alert("Delete service successfully!!");
        // },
        // error: function (data) {
        //     alert("Can not delete...");
        // }
    });
    //alert("Do you really want to delete this service?");
}