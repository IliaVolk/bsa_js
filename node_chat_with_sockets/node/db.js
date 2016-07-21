/**
 * Created by user on 21.07.2016.
 */
var mongodb = require("mongodb");
var url = 'mongodb://localhost:27017/chat';
var MongoClient = mongodb.MongoClient;


module.exports.init = (callback)=> {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        module.exports.getMessages = (skip, callback)=> {
            var messages = db.collection("messages").find({}, {_id: false, user: true, message: true, date: true})
                .sort({date: 1}).skip(skip).toArray(
                    (err, data)=> {
                        if (err) throw err;
                        callback(data);
                    }
                );
        };
        module.exports.addMessage = (message)=> {
            message.date = Date.now();
            db.collection("messages").insert(message);
        };
        module.exports.getMessagesCount = (callback)=> {
            db.collection("messages").find().toArray((err, data)=> {
                if (err) throw err;
                callback(data.length)
            });
        };
        process.on("exit", ()=> {
            db.close();
        });
        callback(db);

    });
};

