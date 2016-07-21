/**
 * Created by user on 21.07.2016.
 */
var socketio = require("socket.io");

module.exports.init = server=> {
    var io = socketio.listen(server, {});
    var count = 0;
    io.on("connection", function (socket) {
        socket.__myprop__ = count++;
        console.log(`socket count : ${socket.__myprop__}`);
        console.log("Client connected");
        socket.on("disconnected", function () {
            console.log("Client disconnected");
        });
        socket.on("chat_message", function (msg) {
            console.log("chat_message", msg);
            db.addMessage(msg);
            io.emit("chat_message", msg);
        });
        db.getMessages(0, data=> {
            socket.emit("chat_history", data);
        });
    });
};