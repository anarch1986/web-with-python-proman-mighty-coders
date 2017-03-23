var cardTemplate = '<li class="card" id="card0" data-parent-board="parent_board" data-status="new" data-order="non">Card title</li>';

var getID = function() {
    var titleData = document.getElementById("boardData").innerHTML;
    var boardID = titleData.substring(0, titleData.indexOf('%'));
    return boardID
};

var formatTitle = function() {
    var forDelete = getID() + '%'
    var titleData = document.getElementById("boardData").innerHTML;
    var newTitle = titleData.replace(forDelete, "");
    document.getElementById("boardCardsTitle").innerHTML = newTitle;
};

var create = function(title) {
    var num;
    if ($(".card")[0]) {
        num = parseInt($(".card:last").attr("id").match(/\d+/)) + 1;
    } else {
        //$("#no_cards").remove();
        num = 1
    }
    if (num < 10) {
        num = "0" + num
    }
    var newCard = $(cardTemplate).prop("id", "card" + num);
    var parentBoard = getID()
    newCard.attr("data-parent-board", parentBoard);
    $("#new").append(newCard);
    document.getElementById("card" + num).innerHTML = title;
    $(".status_list").sortable("refresh");
    var card = $("#card" + num)
    var cardObject = {
        card_id: card.attr("id"),
        title: card.innerHTML,
        parent_board: card.attr("data-parent-board"),
        title: document.getElementById("card" + num).innerHTML,
        status: card.attr("data-status"),
        order: card.attr("data-order")
    };
    var jsonCard = JSON.stringify(cardObject);
    localStorage.setItem(cardObject.parent_board.substring(5, 7) + cardObject.card_id, jsonCard);
};


$(document).ready(function() {
    //display();
    $('#save_card_button').attr("disabled", "disabled");
});

$('#save_card_button').click(function() {
    var title = $('#new_card_title').val();
    create(title);
});

$('#new_card_title').keydown(function() {
    if ($('#new_card_title').val().length > 0) {

        $('#save_card_button').removeAttr("disabled");
    }
});

$("#create_card_modal").on("hidden.bs.modal", function() {
    $('#new_card_title').val('');
    $('#save_card_button').attr("disabled", "disabled");
});

$(function() {
    $("#new, #in_progress, #review, #done").sortable({
        connectWith: ".status_list"
    }).disableSelection();
});

$(".status_list").sortable().droppable().on('sortreceive', function() {
    cards = this.getElementsByClassName("card");
    for (var i = 0; i < cards.length; ++i) {
        $(cards[i]).attr('data-status', this.id);
        console.log(cards[i].getAttribute("data-status"));
    };

});

formatTitle()