var divTaskTitle = $("#div-task-title");
var divTaskDescription = $("#div-task-description");

var taskTitle = $("#task-title");
var taskDescription = $("#task-description");

$(document).ready(function () {

    $('#modalTask').on('hidden.bs.modal', function () {
        clearErrorsTaskForm();
    });

    $("#add-task").submit(function (event) {

        event.preventDefault();

        clearErrorsTaskForm();

        if (validateTask()) {

            var $form = $(this),
                title = $form.find("input[name='task-title']").val(),
                description = $form.find("textarea[name='task-description']").val(),
                url = $form.attr("action");

            var posting = $.post(url, {title: title, description: description});

            posting.done(function (data) {

                var returnedData = JSON.stringify(data);
                var json = JSON.parse(returnedData);

                $('#modalTask').modal('hide');

                var table = $('#tasks-table');
                var lastValue = parseInt(table.find('tr:last').data('value'));

                if (isNaN(lastValue)) {

                    updateTable(table, 0, json);
                    $('#task-info').remove();

                } else {

                    updateTable(table, lastValue + 1, json);
                }

            });

            $(this).trigger("reset");
        }
    });
});

function updateTable(table, value, json) {

    table.find('tr:last')
        .after('<tr data-value="' + value + '">' +
            '<td >' + value + '</td>' +
            '<td>' + json['title'] + '</td>' +
            '<td>' + json['description'] + '</td>' +
            '<td>' + getLocalDateFromJSON(json['date']) + '</td>' +
            '<td>' +
            '<a href="/update/' + json['_id'] + '" class="btn btn-outline-success btn-sm" ' +
            'data-toggle="tooltip" title="Make task made">' +
            '<i class="fa fa-check-circle-o"></i>' +
            '</a>' +
            '<a style="margin-left:4px;" href="/delete/' + json['_id'] + '" class="btn btn-outline-danger btn-sm" ' +
            'data-toggle="tooltip" title="Delete task">' +
            '<i class="fa fa-trash-o"></i>' +
            '</a></td>' +
            '</tr>');
}

function getLocalDateFromJSON(jsonDate) {

    var f_date = new Date(jsonDate);
    var day = f_date.getDate();
    var month = f_date.getMonth() + 1;
    var year = f_date.getFullYear();

    f_date = month + '/' + day + '/' + year;

    return f_date
}

function validateTask() {

    var isValid = true;

    if (taskTitle.val() === "") {
        divTaskTitle.addClass('has-danger');
        taskTitle.addClass('form-control-danger');
        isValid = false;
    }

    if (taskDescription.val() === "") {
        divTaskDescription.addClass('has-danger');
        taskDescription.addClass('form-control-danger');
        isValid = false;
    }

    return isValid;
}

function clearErrorsTaskForm() {

    divTaskTitle.removeClass('has-danger');
    taskTitle.removeClass('form-control-danger');

    divTaskDescription.removeClass('has-danger');
    taskDescription.removeClass('form-control-danger');
}