// listen on port so now.sh likes it
const { createServer } = require('http')

// bot features
// due to the Twitter ToS automation of likes
// is no longer allowed, so:
const Twit = require('twit')
const config = require('./config')
const consoleLol = require('console.lol')

const bot = new Twit(config.twitterKeys)

const post = require('./api/post')

console.rofl('Bot starting...')

// check what day it is and post
console.lol('Checking every ' + config.twitterConfig.post/1000/60 + ' minutes')
post()
setInterval(post, config.twitterConfig.post)

// This will allow the bot to run on now.sh
const server = createServer((req, res) => {
  res.writeHead(302, {
    Location: `https://twitter.com/${config.twitterConfig.username}`
  })
  res.end()
})

server.listen(3000)
