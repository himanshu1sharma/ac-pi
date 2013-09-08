
$(document).ready(function() {

//var socket = io.connect('http://app.himanshusharma.info');
var socket = io.connect('http://localhost');

socket.on('currentTemp', function (data) {
                $('#temp').html() = data;
                console.log(data);
});

$('#forward').mousedown(function() {

    socket.emit('turnOn', { pin:11 });
   
    });

$('select#led').change(function() {
    value = $("#led").val();
    if(value== "on"){
        socket.emit('turnOn');
    }
    else {
        socket.emit('turnOff');
    }

    });
    
});
