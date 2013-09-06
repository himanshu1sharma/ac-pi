var fs = require('fs');
var temp = require('temperature');
var currentTemp;


exports.socket = function (io) {
  io.sockets.on('connection', function(socket) {

    temp.getTemp(function(value){
            currentTemp = value;
            socket.broadcast.emit('currentTemp', {currentTemp : value});
       });
      
  	socket.on('turnOn', function (data) {
  	   
       });

  	socket.on('turnOff', function (data) {
  		  });
  
  setInterval(function() {     
        temp.getTemp(function(value){
            currentTemp = value;
            socket.broadcast.emit('currentTemp', {currentTemp : value});
       });

    }, 10000); 

  });

  
}
