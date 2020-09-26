var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require("cheerio");
var url = require("url");
var express = require('express');

var cnodeUrl = 'https://cnodejs.org';
var app = express();

app.get('/', function (req, ress, next) {
    superagent.get(cnodeUrl)
        .end((err, res) => {
            if (err) {
                return next(err)
            }
            var topicUrls = [];
            var $ = cheerio.load(res.text);
            $("#topic_list .topic_title").each((idx, element) => {
                var $element = $(element);
                var href = url.resolve(cnodeUrl, $element.attr('href'));
                topicUrls.push(href)
            })
            ress.send(topicUrls);
        })

});
app.listen(3003, function (req, res) {
    console.log('app is running   at port 3003');

})