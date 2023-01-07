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

function deleteImage(e) {
    //e.preventDefault();
    // const image=document.getElementById(id).value;
    console.log(e.target);
    console.log(e.target.id);
    console.log(e.target.value);
    const idservice=e.target.id;
    const image=e.target.value;
    $.ajax({
        url: '/admin/service-list/delete-image',
        method: 'post',
        data: { idservice: idservice ,image:image},
        //dataType: 'json',
        // success: function (data) {
        //     // alert("Delete image successfully!!");
        //     res.redirect(req.originalUrl);

        // }
        // error: function (data) {
        //     alert("Can not delete...");
        // }
    })
}