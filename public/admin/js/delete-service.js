function deleteService(idservice) {
    $.ajax({
        url: '/admin/service-list/delete',
        method: 'post',
        data: { idservice: idservice },
        //dataType: 'json',
        success: function (data) {
            alert("Delete service successfully!!");
        },
        error: function (data) {
            alert("Can not delete...");
        }
    })
    alert("Do you really want to delete this service?");
}