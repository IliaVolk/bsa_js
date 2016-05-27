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
        var $item = $("<div></div>"),
            $deleteButton = $("<button>"),
            $crossedCheckbox = $("<input class='checkbox-inline' type='checkbox'>"),
            $contentField = $("<span></span>"),
            itemId = nextId();

        $deleteButton.
            attr("data-item-id", itemId).
            attr("data-action", "deleteItem").
            addClass("invisible pull-right btn btn-danger").
            append("Delete");

        $contentField.
            attr("data-edit", false).
            attr("data-item-id", itemId).
            attr("data-action", "editItem").
            append(text);


        $crossedCheckbox.
            attr("data-item-id", itemId).
            attr("data-action", "crossItem");
        $item.
            attr("id", itemId).
            attr("data-action", "editItem").
            attr("data-item-id", itemId).
            addClass("row").
            append($crossedCheckbox, $contentField, $deleteButton).
            mouseenter(Application.onMouseEnter).
            mouseleave(Application.onMouseLeave);

        return $item;
    };


})();