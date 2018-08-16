var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: "1601049757",
    channelSecret:"e1628678f7d518ad2ed157d4ef72806d",
    channelAccessToken: "K9A//cQbE5YnIadcYB5xCnOCvAmwbOwrCtBPFUaJIIJF9AjIh8JRQXOQgSMT1ci6x/InqRtdjTtFsTFxYtwJv1if6/982AfOWjjzUSQKhVK3nJSuSeTqiAGXY37ZXXtZzES9Gr2yJD17U+LkHzpRZAdB04t89/1O/w1cDnyilFU="
});
//bot.on('message', function (event) {
//    console.log(event); //把收到訊息的 event 印出來看看
//});
bot.on('message', function (event) {
    console.log("MessageLog");
    event.reply(event.message.text).then(function (data) {
    // success
        console.log("My_Successful:"+data); 
    }).catch(function (error) {
    // error
        console.log("My_error:"+error); 
    });
});

const app = express();
const linebotParser = bot.parser();
app.get("/", function (req, res) { 
    res.send("Hello LineBot");
});
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});