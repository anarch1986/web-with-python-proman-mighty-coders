/**
 * Created by okocsis90 on 2017.03.20..
 */


var boardTemplate = '<div class="col-sm-3" id="board0" data-cards="null"><div class="board"><h3 class="board_title" id ="title">Project title</h3><div class="edit-delete-wrapper" id="board-icons"><div class="glyphicon glyphicon-trash" id="delete_board" title="Delete board"></div><div class="glyphicon glyphicon-pencil" id="edit_board" title="Edit board" data-toggle="modal" data-target="#edit_board_modal"></div></div></div></div>';
var dataLayerObj = new dataLayer(handlingDB);


var create = function (title) {
    var num;
    if ($(".board")[0]) {
        num = parseInt($(".col-sm-3:last").attr("id").match(/\d+/)) + 1;
    } else {
        $("#no_boards").remove();
        num = 1
    }
    if (num < 10) {
        num = "0" + num
    }
    var newBoard = $(boardTemplate).prop("id", "board" + num);
    newBoard.children().find('#title').prop("id", "title" + num);
    var card_list = [];
    newBoard.attr("data-cards", JSON.stringify(card_list));
    $("#board_row").append(newBoard);
    document.getElementById("title" + num).innerHTML = title;
    dataLayerObj.saveBoard(num);
};

var display = function () {
    dataLayerObj.loadBoards();
};

$(document).ready(function () {
    display();
    $('#save_board_button').attr("disabled", "disabled");
});

$('.modal').on('shown.bs.modal', function () {
    $(this).find('[autofocus]').focus();
});

$('#save_board_button').click(function () {
    var title = $('#new_board_title').val();
    create(title);
});

$('#new_board_title').keydown(function () {
    if ($('#new_board_title').val().length > 0) {

        $('#save_board_button').removeAttr("disabled");
    }
});

$("#create_board_modal").on("hidden.bs.modal", function () {
    $('#new_board_title').val('');
    $('#save_board_button').attr("disabled", "disabled");
});

$("#create_board_modal").keypress(function (e) {
    if ($('#new_board_title').val().length > 0) {
        if (e.which == 13) {
            $('#save_board_button').click();
        }
    }
});

$("#edit_board_modal").keypress(function (e) {
    if ($('#edit_board_title').val().length > 0) {
        if (e.which == 13) {
            $('#edit_board_button').click();
        }
    }
});

$(document).on("click", ".board", function () {
    var boardID = $(this).parent().attr('id');
    boardID = boardID.replace('board', '');
    location.href = '/details/' + boardID;
});


$(document).on("click", "#delete_board", function (event) {
    event.stopPropagation();
    var boardID = $(this).parent().parent().parent().attr('id');
    var confirmed = confirm('Are you sure you want to delete this board?');
    if (confirmed) {
        dataLayerObj.removeBoard(boardID);
        $(".col-sm-3").remove();
        dataLayerObj.loadBoards();
        location.reload();
    }
});

$(document).on("click", "#edit_board", function (event) {
    event.stopPropagation();
    var editBoardID = $(this).parent().parent().parent().attr('id');
    $("#edit_board_title").val($(this).parent().parent().find("h3").html());
    $(".modal-body").attr("data-board", editBoardID)
});

$('#edit_board_button').click(function () {
    var title = $('#edit_board_title').val();
    var boardID = ($(".modal-body").attr("data-board"));
    $("#" + boardID).find("h3").html(title);
    var edit_title = $('#edit_board_title').val();
    dataLayerObj.editBoard(boardID, edit_title)
});