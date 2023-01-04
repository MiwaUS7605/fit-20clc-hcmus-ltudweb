
// $(function () {
//     console.log("cute");
//     // Start counting from the third row
//     var counter = 1;

//     $("#insertRow").on("click", function (event) {
//         event.preventDefault();

//         var newRow = $("<tr>");
//         var cols = '';

//         // if (counter>1){
//         //   const serviceListController = require('../../.././components/serviceList/ServiceListController');
//         //   const rowId = event.target.parentNode.parentNode.id;
//         //     //this gives id of tr whose button was clicked
//         //       const data = document.getElementById(rowId).querySelectorAll(".row-data"); 
//         //     /*returns array of all elements with 
//         //     "row-data" class within the row with given id*/

//         //       const img_link = data.innerHTML;
//         //       serviceListController.insertImg(img_link);
//         // }
//         // Table columns
//         cols += '<th scrope="row">' + counter + '</th>';
//         cols += '<td><input class="row-data form-control rounded-0" type="text" name="imageLink" placeholder="image link"></td>';
//         cols += '<td><button class="btn site-btn rounded-0" id ="addImage"><i class="fa fa-trash"></i></button></td>';
//         cols += '<td><button type="submit" class="btn btn-danger rounded-0" id ="deleteRow"><i class="fa fa-plus"></i></button></td></tr>';

//         // Insert the columns inside a row
//         newRow.append(cols);

//         // Insert the row inside a table
//         $("table").append(newRow);

//         // Increase counter after each row insertion
//         counter++;
//     });

//     // Remove row when delete btn is clicked
//     $("table").on("click", "#deleteRow", function (event) {
//         $(this).closest("tr").remove();
//         counter -= 1
//     });
// });