var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: "1601049757",
    channelSecret:"",//you're secret
    channelAccessToken: "" //you're token
});
//bot.on('message', function (event) {
//    console.log(event); //把收到訊息的 event 印出來看看
//});
//取得使用者回覆的訊息
bot.on('message', function (event) {
    if (event.message.type = 'text') {
        var msg = event.message.text;
        //重覆使用者說的訊息
        var replyMsg = `您是說: ${event.message.text}`;
        var token=event.reply.token;
        event.reply(replyMsg+"token:"+token).then(function (data) {
            // success
            console.log(event);
        }).catch(function (error) {
            // error
            console.log('error:'+error);
        });
    }
});

// 主動發送訊息
setTimeout(function () {
    var userId = 'User_ID';
    var sendMsg = "主動推播訊息";
    bot.push(userId, [sendMsg]);
    console.log('userId: ' + userId);
    console.log('send: ' + sendMsg);
}, 3000);


const app = express();
const linebotParser = bot.parser();
app.get("/", function (req, res) { 
    res.send("Hello LineBot1");
});
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
// var server = app.listen(process.env.PORT || 8080, function () {
//     var port = server.address().port;
//     console.log("App now running on port", port);
// });

app.listen(3000,()=>{   
    console.log('website is running');

});
