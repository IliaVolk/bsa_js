/**
 * Created by user on 21.07.2016.
 */
"use strict";
var express = require("express");
var path = require("path");
var db = require("./db");
var app = express();
db.init(()=> {
    app.get("/", (req, res)=> {
        res.sendFile(path.join(__dirname, '../dist', 'html', 'index.html'));
    });
    app.get("/js", (req, res)=> {
        res.sendFile(path.join(__dirname, '../dist', 'js', 'bundle.js'));
    });
    var server = app.listen(3000);
    require("./sockets").init(server);
});
