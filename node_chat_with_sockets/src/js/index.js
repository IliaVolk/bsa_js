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
        userName = nameInput.val();
        nameInput.value = "";
    });
    var addToList = function (message) {
        messageList.append(
            $("<li>").text(
                message.user + ": "
                + message.message
            ));
    };
    var userName = "User";
    var socket = io.connect();
    nameButton.click(function () {
        userName = nameInput.val();
        nameInput.value = "";
    });
    messageButton.click(function () {
        var data = {
            user: userName,
            message: messageInput.val()
        };
        messageInput.val("");
        socket.emit("chat_message", data);
    });
    socket.on("chat_history", function (newMessages) {
        for (var i in newMessages) {
            if (newMessages.hasOwnProperty(i)) {
                addToList(newMessages[i])
            }
        }
    });

    socket.on("chat_message", function (data) {
        addToList(data);
    })
})();
