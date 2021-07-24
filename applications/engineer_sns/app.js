// 元ネタ　See: https://qiita.com/HawkClaws/items/599d7666f55e79ef7f56

const express = require("express");
const request = require('request')
const app = express();
const api_end_point = 'https://versatileapi.herokuapp.com/api'
const server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});
// json parser
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

// View EngineにEJSを指定。
app.set('view engine', 'ejs');

app.get("/", function(req, res, next){
    res.render("index", {});
});

app.get("/show", function(req, res, next){
    res.render("show", {});
});

// n件取得する
app.post("/show", function(req, res, next){
    show_limit = req.body['show_limit'] || 20;
    var postedList = {
    method: 'GET',
    json: true,
    url: `${api_end_point}/text/all?$orderby=_created_at desc&$limit=${show_limit}`,
    }
    tweet_list = []
    request(postedList, function(error, response, body) {
        // console.log(body)
        for (let i = 0; i < body.length; i++){
            // 表示内容が拡張できるように連想配列にしておく
            tweet = []
            tweet.push(body[i].text);
            tweet_list.push(tweet)
        };
        // HTMLタグで改行区切り
        res.send(tweet_list.join('<br>'))
    });
});
