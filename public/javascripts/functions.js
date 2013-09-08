
var setTemp;
var state;

$(document).ready(function() {

//var socket = io.connect('http://app.himanshusharma.info');
var socket = io.connect('http://localhost');

socket.on('state', function(data){
    (data.state == 1 ? $('#led').val('on').slider("refresh") : $('#led').val('off').slider("refresh"));
    $('#setTemp').val(data.temp).slider("refresh");
});

socket.on('currentTemp', function (data) {
                $('#temp').html(data);
});

$('#done').click(function() {
    setTemp = $('#setTemp').val();
    socket.emit('changeTemp',setTemp);
   
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
