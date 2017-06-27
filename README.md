twitter-streaming-nodejs
========================

Shows how to stream real time twitter data to Google Maps using NodeJS.

This repo was forked from https://github.com/safesoftware/twitter-streaming-nodejs.


A walkthrough of the original code is available <a href="http://blog.safe.com/2014/03/twitter-stream-api-map/" target="_blank">here</a>. Below deploying the application on AWS Elastic Beanstalk is discussed.

I added a connection to a local mongodb collection I call tweets.<br>
Only the tweets that match the "track" list of words are streamed.<br>
If you want to deploy it on heroku, you'll need to connect to mlab with monk.<br>
Careful because the 5Mb limit will quickly be reached.
