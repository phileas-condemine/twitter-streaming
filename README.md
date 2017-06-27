twitter-streaming-nodejs
========================

Shows how to stream real time twitter data to Google Maps using NodeJS.

This repo was forked from https://github.com/safesoftware/twitter-streaming-nodejs.


A walkthrough of the original code is available <a href="http://blog.safe.com/2014/03/twitter-stream-api-map/" target="_blank">here</a>. Below deploying the application on AWS Elastic Beanstalk is discussed.

I added a connection to a local mongodb collection I call tweets.<br>
Only the tweets that match the "track" list of words are streamed.<br>
If you want to deploy it on heroku, you'll need to connect to mlab with monk.<br>
Careful because the 5Mb limit will quickly be reached.
<h1> Step 0 </h1>
Get your twitter app key & token.<br>
In twitter_credentials.json, replace consumer_key, consumer_secret, access_token_key, access_token_secret. With your info.<br>
<h1> Set up the local mongo </h1>
First you'll need to install mongodb. THEN :<br>
In a first CLI run <br><code>mkdir data; cd data; mongod --dbpath . --port 27017;</code><br>
In a second CLI run <br><code>npm install;supervisor server;</code><br>
supervisor is used to refresh the app when modification in the code are saved.
In a third CLI run<br><code>mongo mongodb://localhost:27017/</code><br> then <br><code>show dbs</code> you should see one db named "admin"<br>
<code>use admin</code> switch to this db<br>
<code>show collections</code> check the collections available in this db. The app populates "tweets".<br>
Run this line to check the places when streamed happened  <br><code>db.tweets.find({}).forEach(function(doc){print(JSON.stringify(doc.place));})</code><br>

<div class="panel">
{"id":"42e46bc3663a4b5f","url":"https://api.twitter.com/1.1/geo/id/42e46bc3663a4b5f.json" ,"place_type":"city","name":"Fort Worth","full_name":"Fort Worth, TX","country_code":"US","country":"United States","bounding_box":{"type":"Polygon","coordinates":[[[-97.538285,32.569477],[-97.538285,32.990456],[-97.033542,32.990456],[-97.033542,32.569477]]]},"attributes":{}}

{"id":"18810aa5b43e76c7","url":"https://api.twitter.com/1.1/geo/id/18810aa5b43e76c7.json" ,"place_type":"city","name":"Dallas","full_name":"Dallas, TX","country_code":"US","country":"United States","bounding_box":{"type":"Polygon","coordinates":[[[-96.977527,32.620678],[-96.977527,33.019039],[-96.54598,33.019039],[-96.54598,32.620678]]]},"attributes":{}}
</div><br>

In a browser you can open <b>localhost:8081</b> to see the map and heatmap.
<img src="/public/image/running-app.png">
