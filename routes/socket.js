var fs = require('fs');
var servo = require('servo');
var currentTemp;
var acState = {};

fs.readFile("pinstate.json", 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
  data = JSON.parse(data);
  acState = data;
  console.log(JSON.stringify(data));
});

function setState(value){
  acState.state = value;
  fs.writeFile("pinstate.json", JSON.stringify(acState), function(err) {
            if(err) {
                console.log(err);
          }
        }); 
}

function setDisabled(value){
  acState.disabled = value;
  fs.writeFile("pinstate.json", JSON.stringify(acState), function(err) {
            if(err) {
                console.log(err);
          }
        }); 
}

function setTemp(t){
  acState.temp = t;
  fs.writeFile("pinstate.json", JSON.stringify(acState), function(err) {
            if(err) {
                console.log(err);
          }
        }); 

}

function getTemperature(callback) {

fs.readFile('temperature','utf-8', function (err, data) {
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
    
    socket.emit('state',acState);

    socket.on('changeTemp', function (t) {      
        setTemp(t);
        socket.emit('state',acState);
        socket.broadcast.emit('state',acState);
      });

  	socket.on('turnOn', function () { 	
        setDisabled(true);
        setState(1);
        socket.emit('state',acState);
        socket.broadcast.emit('state',acState);

        setTimeout(function(){
          servo.turnOn();
          setDisabled(false);
          socket.emit('state',acState);
          socket.broadcast.emit('state',acState);
        },5000);
        
      });

  	socket.on('turnOff', function () {

       setDisabled(true);
        setState(0);
        socket.emit('state',acState);
        socket.broadcast.emit('state',acState);

      setTimeout(function(){
          servo.turnOn();
          setDisabled(false);
          socket.emit('state',acState);
          socket.broadcast.emit('state',acState);
        },5000);

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
