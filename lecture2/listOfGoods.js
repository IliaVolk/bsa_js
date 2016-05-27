/**
 * Created by user on 26.05.2016.
 */


var Application = {};
var keyCode = {
    ENTER: 13,
    ESCAPE: 27
};

(function (Application) {
    var $container,
        id = 0,
        $crossAllCheckBox,
        $deleteCrossedButton,
        $itemList,
        $buttonField,
        $addItemInputField;
    Application.onMouseEnter = function (e) {
        $("#" + $(e.target).
            attr("data-item-id")).
            addClass("mouse-entered").
            find("button").
            removeClass("invisible");
    };
    Application.onMouseLeave = function (e) {
        $("#" + $(e.target).
            attr("data-item-id")).
            removeClass("mouse-entered").
            find("button").
            addClass("invisible");
    };

    Application.onClick = function (e) {
        var $targetItem = $("#" + $(e.target).attr("data-item-id"));
        switch ($(e.target).attr("data-action")) {
            case "deleteItem":
                Application.deleteItem($targetItem);
                break;
            case "crossItem":
                if (!$targetItem.attr("data-is-crossed"))
                    Application.crossItem($targetItem);
                else Application.uncrossItem($targetItem);
                $crossAllCheckBox.setNotChecked();

                break;
        }
    };
    Application.onDoubleClick = function (e) {
        switch ($(e.target).attr("data-action")) {
            case "editItem":
                var $targetItem = $("#" + $(e.target).attr("data-item-id")),
                    $contentField = $($targetItem.find("span")),
                    text = $contentField.text(),
                    $input = $("<input type='text'>");

                if ($contentField.find("input").length){
                    return;
                }
                $contentField.empty();
                $contentField.append($input);
                $input.
                    attr("data-previous-text", text).
                    attr("data-item-id", $targetItem.attr("id")).
                    val(text);
                break;
        }
    };
    Application.onKeyUp = function (e) {
        try {
            var $input = $(e.target);
            var $targetItem = $("#" + $input.attr("data-item-id"));
            var text = $input.val();

            switch (e.keyCode) {
                case keyCode.ENTER:
                    break;
                case keyCode.ESCAPE:
                    text = $input.attr("data-previous-text");
                    break;
                default :
                    return;
            }
            $input.remove();

            $targetItem.find("span").append(text);
        } catch (e) {
            //safe return
        }
    };

    Application.addItem = function (text) {
        $itemList.append(createListItem(text));
    };

    Application.deleteItem = function ($item) {
        $item.remove();
    };

    Application.crossItem = function ($item) {
        $item.
            attr("data-is-crossed", true).
            find("span").addClass("crossed");
    };
    Application.uncrossItem = function ($item) {
        $item.
            removeAttr("data-is-crossed").
            find("span").removeClass("crossed");
    };
    Application.deleteCrossed = function () {
        $itemList.find(".row").each(
            function () {
                if ($(this).attr("data-is-crossed")) {
                    Application.deleteItem(this);
                }
            }
        );
    };
    Application.toggleCross = function (cross) {
        $itemList.find(".row").each(
            function () {
                var $item = $(this);
                cross ? Application.crossItem($item) : Application.uncrossItem($item);
                var checkbox = $item.find("input:checkbox").get()[0];
                checkbox.checked = cross;
            }
        );
    };


    Application.init = function (containerId) {

        $crossAllCheckBox = new ActiveCheckBox(
            function (checked) {
                Application.toggleCross(checked);
            }, "Cross All");

        $deleteCrossedButton = $("<li><a>DeleteCrossed</a></li>");
        $itemList = $("<div></div>");
        $buttonField = $("<ul></ul>");
        $addItemInputField = $("<input type='text'>");
        $buttonField.
            append($crossAllCheckBox.$element, $deleteCrossedButton).
            addClass("nav nav-pills unselectable");

        $itemList.
            addClass("container");

        $addItemInputField.keyup(function (e) {
                if (e.keyCode === keyCode.ENTER) {
                    Application.addItem($addItemInputField.val());
                    $addItemInputField.val("");
                    $crossAllCheckBox.setNotChecked();
                }
                e.stopPropagation();
            }
        );

        $deleteCrossedButton.click(this.deleteCrossed.bind(this));


        $container = $("#" + containerId);
        $container.
            click(this.onClick).
            dblclick(this.onDoubleClick).
            keyup(this.onKeyUp).
            addClass("container").
            append("<h1>List of goods</h1>", $itemList, "New Item: ", $addItemInputField, $buttonField);


    };


})(Application);

