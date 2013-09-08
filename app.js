/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , routes = require('./routes')
  , path = require('path');

var temp = require('temperature');
var currentTemp;
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Server listening on port " + app.get('port'));
});

var socket = require('./routes/socket');
var io = require('socket.io').listen(server,{ log: false });

app.get('/', routes.index);

console.log('Intialising Temperature module');
  temp.init();
  temp.getTemp(function(value){
     if(typeof value != 'undefined' && value != null){
                writeTemperature(value);         
              }   
      });

  setInterval(function() {     
    console.log('Getting temperature');
        temp.getTemp(function(value){ 
            if(typeof value != 'undefined' && value != null){
                writeTemperature(value);        
              }  
       });

    }, 60000); 

   
function writeTemperature(value) {

    fs.writeFile('temperature',data, function(err) {
            if(err) {
                console.log(err);
          }
        }); 
}

socket.socket(io);