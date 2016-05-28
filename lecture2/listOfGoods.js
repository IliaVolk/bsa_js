/**
 * Created by user on 26.05.2016.
 */


var Application = {};
var keyCode = {
    ENTER: 13,
    ESCAPE: 27

};
var keyEscapeCharacters = {
    "<": "&lt;",
    ">": "&gt;"
};

(function (Application) {
    var $container,
        id = 0,
        $crossAllCheckBox,
        $deleteCrossedButton,
        $itemList,
        $buttonField,
        $addItemInputField;


    Application.escapeCharacters = function (text) {
        var textToReturn = text;
        $.each(keyEscapeCharacters, function (key, escape) {
            textToReturn = textToReturn.replace(new RegExp(key, "g"), escape);
        });
        return textToReturn;
    };
    Application.deEscapeCharacters = function (text) {
        var textToReturn = text;
        $.each(keyEscapeCharacters, function (key, escape) {
            textToReturn = textToReturn.replace(new RegExp(escape, "g"), key);
        });
        return textToReturn;

    };
    Application.onMouseEnterItem = function (e) {
        $("#" + $(e.target).
            attr("data-item-id")).
            addClass("mouse-entered").
            find("button").
            removeClass("invisible");
    };
    Application.onMouseLeaveItem = function (e) {
        $("#" + $(e.target).
            attr("data-item-id")).
            removeClass("mouse-entered").
            find("button").
            addClass("invisible");
    };
    Application.onDeleteItem = function (e) {
        Application.deleteItem(
            $("#" + $(e.target).attr("data-item-id")));
    };

    Application.onCrossItem = function (e) {
        var $targetItem = $("#" + $(e.target).attr("data-item-id"));
        if (!$targetItem.attr("data-is-crossed")) {
            Application.crossItem($targetItem);
        } else {
            Application.uncrossItem($targetItem);
            $crossAllCheckBox.setNotChecked();
        }
        //prevent from editing item while crossing
        e.stopPropagation();
    };

    Application.onItemEdit = function (e) {
        var $targetItem = $("#" + $(e.target).attr("data-item-id")),
            $contentField = $($targetItem.find("span")),
            text = Application.deEscapeCharacters($contentField.text()),
            $input = $("<input type='text'>");

        if ($contentField.find("input").length) {
            //if item is being edited
            return;
        }
        $contentField.empty();
        $contentField.append($input);
        $input.
            attr("data-previous-text", text).
            attr("data-action", "editItemEnd").
            attr("data-item-id", $targetItem.attr("id")).
            val(text);
    };

    Application.onEditItemEnd = function (e) {
        var $input = $(e.target),
            $targetItem = $("#" + $input.attr("data-item-id")),
            text = $input.val();

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
        $targetItem.find("span").append(Application.escapeCharacters(text));
    };


    Application.addItem = function (text) {
        if (text)
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
                $item.find("input:checkbox").get()[0].checked = cross;
            }
        );
    };


    Application.init = function (containerId) {

        $crossAllCheckBox = new ActiveCheckBox(
            function (checked) {
                Application.toggleCross(checked);
            }, "Cross All");

        $deleteCrossedButton = $("<li><a>DeleteCrossed</a></li>")
            .click(this.deleteCrossed);

        $itemList = $("<div></div>").
            addClass("container");

        $buttonField = $("<ul></ul>").
            append($crossAllCheckBox.$element, $deleteCrossedButton).
            addClass("nav nav-pills unselectable");

        $addItemInputField = $("<input type='text'>")
            .keyup(function (e) {
                if (e.keyCode === keyCode.ENTER) {
                    Application.addItem($addItemInputField.val());
                    $addItemInputField.val("");
                    $crossAllCheckBox.setNotChecked();
                }
            }
        );

        $container = $("#" + containerId).
            on("dblclick", "[data-action='editItem']", this.onItemEdit).
            on("click", "[data-action='crossItem']", this.onCrossItem).
            on("click", "[data-action='deleteItem']", this.onDeleteItem).
            on("keyup", "[data-action='editItemEnd']", this.onEditItemEnd).
            on("mouseenter", "[allocatable]", this.onMouseEnterItem).
            on("mouseleave", "[allocatable]", this.onMouseLeaveItem).
            addClass("container").
            append("<h1>List of goods</h1>", $itemList, "New Item: ", $addItemInputField, $buttonField);
    };

})(Application);

