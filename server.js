//Setup web server and socket
var twitter = require('twitter'),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    MongoClient = require('mongodb').MongoClient,
    io = require('socket.io').listen(server);

//Setup twitter stream api
var twit = new twitter({
  consumer_key: 'Ie3YkBZadsgVMtu2dF17l7nYF',
  consumer_secret: '0W1KYWP9p6kCtEC3GjBVXPWrDLSI66GqadIjiNt7OaxJniW855',
  access_token_key: '877868908757299200-VAUhyJrVJdaSbaSmo4bS2HTZG4JLUiV',
  access_token_secret: '3JkhVTrzeiACWMjMAoTnG5Ne3kIRFMhtiG6MpmXjq2yys'
}),
stream = null,
// cd to twitter-streaming-nodejs/data
// create mongod --dbpath . --port 27017

url_mongo = 'mongodb://localhost:27017/';


//Use the default port (for beanstalk) or default to 8081 locally
server.listen(process.env.PORT || 8081);

//Setup routing for app
app.use(express.static(__dirname + '/public'));
/*app.get("/google1bb01cf67460edbd.html",function(req,res){
        res.sendfile('./google1bb01cf67460edbd.html');
  })*/
//Create web sockets connection.


io.sockets.on('connection', function (socket) {
  socket.on("start tweets", function() {
    if(stream === null) {
      //Connect to twitter stream passing in filter for entire world.
      console.log("init-connection to statuses/filter")
      twit.stream('statuses/filter', {'locations':'35,-10,55,25','track':'accident, crash, driver, fire, alarm, risk, injury, help'}, function(stream) {
          stream.on('data', function(data) {
              // Does the JSON result have coordinates
              if (data.coordinates){
                if (data.coordinates !== null){
                  MongoClient.connect(url_mongo, function(err, db) {
                    if (err){
                      console.log(err)
                    }
                    console.log("Connected correctly to server");
                    db.collection('tweets').insert(data,function(err,records){
                      if(err){console.log("error when writing to mongod:"+err)}
                      console.log(records)
                    });
                    db.close();
                  });
                  //If so then build up some nice json and send out to web sockets
                  var outputPoint = {"lat": data.coordinates.coordinates[0],"lng": data.coordinates.coordinates[1]};
                  // console.log("data coordinates: lat" + data.coordinates.coordinates[0] + " lon "+ data.coordinates.coordinates[1]);

                  socket.broadcast.emit("twitter-stream", outputPoint);

                  //Send out to web sockets channel.
                  socket.emit('twitter-stream', outputPoint);

                }
                else if(data.place){
                  if(data.place.bounding_box === 'Polygon'){
                    // Calculate the center of the bounding box for the tweet
                    var coord, _i, _len;
                    var centerLat = 0;
                    var centerLng = 0;

                    for (_i = 0, _len = coords.length; _i < _len; _i++) {
                      coord = coords[_i];
                      centerLat += coord[0];
                      centerLng += coord[1];
                    }
                    centerLat = centerLat / coords.length;
                    centerLng = centerLng / coords.length;

                    // Build json object and broadcast it
                    var outputPoint = {"lat": centerLat,"lng": centerLng};
                    socket.broadcast.emit("twitter-stream", outputPoint);

                  }
                }
              } //else {console.log("no data input");}
              stream.on('limit', function(limitMessage) {
                return console.log(limitMessage);
              });

              stream.on('warning', function(warning) {
                return console.log(warning);
              });

              stream.on('disconnect', function(disconnectMessage) {
                return console.log(disconnectMessage);
              });
          });
      });
    }
  });

    // Emits signal to the client telling them that the
    // they are connected and can start receiving Tweets
    socket.emit("connected");
});
