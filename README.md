twitter-streaming-nodejs
========================

Shows how to stream real time twitter data to Google Maps using NodeJS.

This repo was forked from https://github.com/safesoftware/twitter-streaming-nodejs.


A walkthrough of the original code is available <a href="http://blog.safe.com/2014/03/twitter-stream-api-map/" target="_blank">here</a>. Below deploying the application on AWS Elastic Beanstalk is discussed.

I added a connection to a local mongodb collection I call tweets.<br>
Only the tweets that match the "track" list of words are streamed.<br>
If you want to deploy it on heroku, you'll need to connect to mlab with monk.<br>
Careful because the 5Mb limit will quickly be reached.

<h1> Set up the local mongo </h1>
First you'll need to install mongodb. THEN :<br>
In a first CLI run <br><code>mkdir data; cd data; mongod --dbpath . --port 27017;</code><br>
In a second CLI run <br><code>npm install;supervisor server;</code><br>
supervisor is used to refresh the app when modification in the code are saved.
In a third CLI run<br><code>mongo mongodb://localhost:27017/" then "use admin</code><br>
For instance you can run this line to check the places when streamed happened  <br><code>db.tweets.find({}).forEach(function(doc){print(JSON.stringify(doc.place));})</code><br>
In a browser you can open <b>localhost:8081</b> to see the map and heatmap.
