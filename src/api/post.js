const Twit = require('twit')
const config = require('../config')

const bot = new Twit(config.twitterKeys)

// function: tweets about Worf Wednesday status
function tweetNow(text, filePath) {
  	bot.postMediaChunked({ file_path: filePath }, function (err, data, response) {
  		if (err) {
      		console.lol('ERRORDERP Reply', err)
    	}
    	console.log(data)
    	var mediaIdStr = data.media_id_string

    	let tweet = {
			status: text,
			media_ids: [mediaIdStr]
		}

		bot.post('statuses/update', tweet, (err, data, response) => {
			if (err) {
			  	console.lol('ERRORDERP Reply', err)
			}
			console.lol('SUCCESS: ', text)
		})
	})
}

const post = () => {
	console.lol('Checking day of week.')

	var date = new Date();
	var day = date.getDay();
	var hour = date.getHours();

	console.lol('The day is ' + day + ', hour ' + hour)

	if (day === 3) {
		console.lol('IT IS WORF WEDNESDAY!!')
		if(hour === 8) {
			console.lol('Posting Worf Wednesday')

			var filePath = './img/worfwednesday.gif'
			tweetNow('HAPPY WORF WEDNESDAY! #WorfWednedsay', filePath)
		}
	}
	else if (day == 5) {
		console.lol('It is Ferengi Friday.')
		if(hour === 8) {
			console.lol('Posting Ferengi Friday')
			var filePath = './img/ferenthunder.gif'
			tweetNow('Thank Quark it\'s Ferengi Friday! #FerengiFriday', filePath)
		}
	}
	else {
		console.lol('Nothing to post')
	}
}

module.exports = post