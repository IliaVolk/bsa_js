/**
 * Created by user on 21.07.2016.
 */



(function () {
    var nameInput = $("#nameInput"),
        nameButton = $("#nameButton"),
        messageInput = $("#messageInput"),
        messageButton = $("#messageButton"),
        messageList = $("#messageList");
    var userName = "User";
    nameInput.val(userName);
    nameButton.click(function () {
        var newName = nameInput.val();
        userName = newName;
        nameInput.value = "";
    });
    var addToList = function (message) {
        messageList.append(
            $("<li>").text(
                message.user + ": "
                + message.message
            ));
    };
    messageButton.click(function () {
        var data = {
            user: userName,
            message: messageInput.val()
        };
        messageInput.val("");
        //addToList(data);
        $.post("/messages", data);
    });
    var getData = function () {
        $.ajax('messages', {
            data: {skip: messageList.find("li").length},
            method: "GET",
            contentType: 'application/json',
            success: function (newMessages) {
                newMessages = JSON.parse(newMessages);
                for (var i in newMessages) {
                    if (newMessages.hasOwnProperty(i)) {
                        addToList(newMessages[i]);
                    }
                }
                setTimeout(getData, 10);
            }
        });
    };
    getData();
})();
