var fs = require('fs');
var servo = require('servo');
var currentTemp;


function getTemperature(callback) {

fs.readFile('temperature', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
      callback(data);
  });
}

exports.socket = function (io) {
  io.sockets.on('connection', function(socket) {

    //Init the pin
    servo.init();
    currentTemp = null; 
        getTemperature(function(value){ 
            currentTemp = value;
              console.log('Emitting first')
              socket.emit('currentTemp',currentTemp); 
          });
    
  	socket.on('turnOn', function () { 	   
        servo.turnOn(); 
      });

  	socket.on('turnOff', function () {
      servo.turnOff(); 
  		  });
  
  setInterval(function() {     
        getTemperature(function(value){ 
            if(typeof value != 'undefined' && value != currentTemp){
                socket.emit('currentTemp',value);
                socket.broadcast.emit('currentTemp',value);         
              }   
            currentTemp = value;
       });

    }, 60000); 

  });

  
}
