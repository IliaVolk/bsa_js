/**
 * Created by user on 27.05.2016.
 */


var createListItem = function (text) {
    var $item = $("<div></div>"),
        $deleteButton = $("<button>"),
        $crossedCheckbox = $("<input class='btn btn-warning' type='checkbox'>"),
        $contentField = $("<span></span>"),
        itemId = Application.nextId();

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
        mouseenter(Application.eventListener.mouseenter).
        mouseleave(Application.eventListener.mouseleave);
    return $item;
};

