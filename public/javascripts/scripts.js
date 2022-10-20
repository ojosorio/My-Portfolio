/*
scripts.css
Oscar Osorio
301229160
2022-10-07
*/

$(function () {
    console.log("ready!");

});

/* Business */

$('#update_alert').hide();

$("#submit_update").on("click", function (event, obj) {

    console.log(document.getElementById("update_form").elements);
    const elements = document.getElementById("update_form").elements;
    var valid = true;
    for (let index = 0; index < elements.length; ++index) {
        const element = elements[index];
        if (!element.checkValidity()) {
            valid = false;
        }
    }

    if (valid) {
        $('#update_alert').hide();

        console.log("serialize: " + $("#update_form").serialize());
        $.ajax({
            url: "/business/update",
            type: "post",
            data: $("#update_form").serialize(),
            success: function (response) {
                $('#updateModal').modal('show');
            },
            error: function (xhr) {
                console.log("error: " + xhr);
            }
        });

    } else {
        $('#update_alert').show();
    }

});

$('#updateModal').on('hidden.bs.modal', function () {
    window.location.href = "/business";
});