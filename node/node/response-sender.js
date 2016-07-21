/**
 * Created by user on 21.07.2016.
 */
"use strict"

var db = require("./db");
let responses = [];
module.exports.gotNewRequests = (skip, callback)=> {
    db.getMessagesCount(count=> {
        callback(count > skip)
    });
};

let minSkip = ()=> {
    let min = responses[0]._skip;
    for (let r of responses) {
        if (r._skip < min) min = r._skip;
    }
    return min;
};
let getSendMessagesCallback = res=> {
    return data=> {
        res.end(JSON.stringify(data));
    }
};
module.exports.sendMessagesToOne = (res, skip)=> {
    db.getMessages(skip, getSendMessagesCallback(res));
};

module.exports.sendMessagesToAll = ()=> {
    process.nextTick(()=> {
        let skip = minSkip();
        db.getMessages(skip, (data) => {
            responses.forEach(res=> {
                return getSendMessagesCallback(res)(data.slice(res._skip - skip))
            });
            responses = [];
        });
    })
};
module.exports.addResponseToQueue = res=> {
    responses.push(res);
};