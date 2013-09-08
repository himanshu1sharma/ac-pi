var fs = require('fs');
var temp = require('temperature');
var servo = require('servo');
var currentTemp;


exports.socket = function (io) {
  io.sockets.on('connection', function(socket) {

    //Init the pin
    temp.getTemp(function(value){
            currentTemp = value;
       });

    servo.init();

  	socket.on('turnOn', function () { 	   
        servo.turnOn(); 
      });

  	socket.on('turnOff', function () {
      servo.turnOff(); 
  		  });
  
  setInterval(function() {     
        temp.getTemp(function(value){ 
            if(typeof value != 'undefined' && value != currentTemp)
                socket.emit('currentTemp',value);            
            currentTemp = value;
       });

    }, 10000); 

  });

  
}
