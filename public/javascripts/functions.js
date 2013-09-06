
$(document).ready(function() {

var socket = io.connect('http://localhost');

socket.on('currentTemp', function (data) {
    console.log(data);
    $("p").text(data);
});

$('#forward').mousedown(function() {

    socket.emit('turnOn', { pin:11 });
    socket.emit('turnOn', { pin:15 });

    });

$('#forward').mouseup(function() {
    socket.emit('turnOff', { pin:11 });
    socket.emit('turnOff', { pin:15 });
    
    });

$('#forward').mouseleave(function() {
    socket.emit('turnOff', { pin:11 });
    socket.emit('turnOff', { pin:15 });
    
    });

$('#left').mousedown(function() {

    socket.emit('turnOn', { pin:12 });
    socket.emit('turnOn', { pin:15 });

    });

$('#left').mouseup(function() {
    socket.emit('turnOff', { pin:12 });
    socket.emit('turnOff', { pin:15 });
    
    });


$('#left').mouseleave(function() {
    socket.emit('turnOff', { pin:12 });
    socket.emit('turnOff', { pin:15 });
    
    });
$('#right').mousedown(function() {

    socket.emit('turnOn', { pin:11 });
    socket.emit('turnOn', { pin:16 });

    });

$('#right').mouseup(function() {
    socket.emit('turnOff', { pin:11 });
    socket.emit('turnOff', { pin:16 });
    
    });
$('#right').mouseleave(function() {
    socket.emit('turnOff', { pin:11 });
    socket.emit('turnOff', { pin:16 });
    
    });

$('#back').mousedown(function() {

    socket.emit('turnOn', { pin:12 });
    socket.emit('turnOn', { pin:16 });

    });

$('#back').mouseup(function() {
    socket.emit('turnOff', { pin:12 });
    socket.emit('turnOff', { pin:16 });
    
    });
$('#back').mouseleave(function() {
    socket.emit('turnOff', { pin:12 });
    socket.emit('turnOff', { pin:16 });
    
    });


$('select#led').change(function() {
    value = $("#led").val();
    if(value== "on"){
        socket.emit('turnOn', { pin:13 });
    }
    else {
        socket.emit('turnOff', { pin:13 });
    }

    });
    
});
