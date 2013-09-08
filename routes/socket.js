var fs = require('fs');
var temp = require('temperature');
var currentTemp;


exports.socket = function (io) {
  io.sockets.on('connection', function(socket) {

    //Init the pin
    temp.getTemp(function(value){
            currentTemp = value;
       });

  	socket.on('turnOn', function (data) { 	   
       });

  	socket.on('turnOff', function (data) {
  		  });
  
  setInterval(function() {     
        temp.getTemp(function(value){ 
            if(typeof value != 'undefined' && value != currentTemp)
                socket.broadcast.emit('currentTemp', {currentTemp : value});
            
            currentTemp = value;
       });

    }, 10000); 

  });

  
}
