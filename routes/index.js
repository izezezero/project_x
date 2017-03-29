var express = require('express');
var router = express.Router();
var LINEBot = require('line-messaging');

var bot = LINEBot.create({
	channelID: '1499098268',
	channelSecret: '347ab0e4feda826bc266828dba9cdca7',
	channelToken: 'zxr7Rjgp5Z1fBXsDRm4AlRAbBYlgSkbCtFjQhuFfVGHtsb+2lG/xMQT7Wb/EuswgqwtDau3EARfAwzghvtXTvBPs0NGN65+O4ZF+Ns1hr38n6H2+BB20LeLFsZu+nmZORMMTC1AA0WaEyeB5+nkgAAdB04t89/1O/w1cDnyilFU='
});
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/sendMsg', function(req, res, next) {
	var msg = "test 1 "
	var userId = "U3727f363a9782fb3b93b59b77d454433"
	bot.pushTextMessage(userId, msg)
	res.send({ status: 0, data: msg })
})

router.get('/getProfile', function(req, res, next) {
	var msg = "test 1 "
	var userId = "U3727f363a9782fb3b93b59b77d454433"
	bot.getProfile(userId)
		.then((data) => {
			console.log(data)
			res.send(data)
		}).catch((err) => {
			console.log(err)
		})
})

router.post('/', function(req, res, next) {
	var data = req.body.events
	console.log(data)
	console.log(data[0].source)
	var replyToken = data.replyToken
	var userId = data.source.userId
	bot.getProfile(userId)
		.then(data => {
			return Promise((resolve, reject) => {
				resolve(data.displayName)
			})
		}).then(name => {
			bot.replyTextMessage(replyToken, 'hi ' + name + '^^')
				.then(function(data) {
					console.log(data)
				})
		}).catch(err => console.log(err))
	res.send({ test: "test" })
})



module.exports = router;
