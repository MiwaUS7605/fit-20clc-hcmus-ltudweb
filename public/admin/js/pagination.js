function paginationDisplay(page) {
    $.ajax({
        method: "get",
        url: $(location).attr("href"),
        datatype: "json",
        data: { page: page },
        success: function (data) {
            $("#table-pagination").empty().append($(data).find("#table-pagination").children());
            $("#paginator-items").empty().append($(data).find("#paginator-items").children());
            
        },

        error: function (arg, data, value) {
            alert(page);
        }
    });
    page.preventDefault();
}