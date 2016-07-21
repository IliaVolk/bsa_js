/**
 * Created by user on 21.07.2016.
 */
"use strict"
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var db = require("./db");
var responseSender = require("./response-sender");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
db.init(()=> {
    app.get("/", (req, res)=> {
        res.sendFile(path.join(__dirname, '../dist', 'html', 'index.html'));
    });
    app.get("/js", (req, res)=> {
        res.sendFile(path.join(__dirname, '../dist', 'js', 'bundle.js'));
    });
    app.get("/messages", (req, res)=> {
        var skip = parseInt(req.query.skip);
        responseSender.gotNewRequests(skip, answer=> {
            if (answer === true) {//=== yes
                responseSender.sendMessagesToOne(res, skip)
            } else {
                res._skip = skip;
                responseSender.addResponseToQueue(res);
            }
        });
    });
    app.post("/messages", (req, res)=> {
        var message = req.body;
        db.addMessage(message);
        responseSender.sendMessagesToAll();
        res.end();
    });
    app.listen(3000);

});
