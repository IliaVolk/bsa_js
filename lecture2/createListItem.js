/**
 * Created by user on 27.05.2016.
 */


var createListItem;
(function(){
    var id = 0,
        nextId = function () {
        return id++;
    };
    createListItem = function (text) {
        text = Application.escapeCharacters(text);
        var itemId = nextId();
        return $("<div></div>").
            attr("id", itemId).
            attr("allocatable", "").
            attr("data-action", "editItem").
            attr("data-item-id", itemId).
            addClass("row list-item").
            append(
            $("<input class='checkbox-inline' type='checkbox'>").
                attr("data-item-id", itemId).
                attr("data-action", "crossItem"),
            $("<span></span>").
                attr("data-item-id", itemId).
                attr("data-action", "editItem").
                append(text),
            $("<button>").
                attr("data-item-id", itemId).
                attr("data-action", "deleteItem").
                addClass("invisible pull-right btn btn-danger").
                append("Delete")
        );
    };
})();