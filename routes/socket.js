var fs = require('fs');
var temp = require('temperature');
var servo = require('servo');
var currentTemp;


exports.socket = function (io) {
  io.sockets.on('connection', function(socket) {

    //Init the pin
    temp.init();
    servo.init();
    currentTemp = null; 
        temp.getTemp(function(value){ 
            currentTemp = value;
            if(currentTemp ! = null){
              console.log('Emitting first')
            socket.emit('currentTemp',currentTemp);
          } else {
              temp.getTemp(function(value){ 
              currentTemp = value;
              console.log('Emitting first')
              socket.emit('currentTemp',currentTemp);
            });
          }            
        });
    
  	socket.on('turnOn', function () { 	   
        servo.turnOn(); 
      });

  	socket.on('turnOff', function () {
      servo.turnOff(); 
  		  });
  
  setInterval(function() {     
        temp.getTemp(function(value){ 
            if(typeof value != 'undefined' && value != currentTemp){
                socket.emit('currentTemp',value);
                socket.broadcast.emit('currentTemp',value);         
              }   
            currentTemp = value;
       });

    }, 60000); 

  });

  
}
