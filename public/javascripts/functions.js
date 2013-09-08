
var setTemp;

$(document).ready(function() {

//var socket = io.connect('http://app.himanshusharma.info');
var socket = io.connect('http://localhost');

socket.on('state', function(data){
    (data.state == 1 ? $('#led').val('on').slider("refresh") : $('#led').val('off').slider("refresh"));
    $('#setTemp').val(data.temp).slider("refresh");
    $('#led').slider("disable");
});

socket.on('currentTemp', function (data) {
        $('#temp').html(data);
});

$('#done').click(function() {
    setTemp = $('#setTemp').val();
    socket.emit('changeTemp',setTemp);   
    $(this).addClass('ui-disabled');

    });
/*
$('select#led').change(function() {
    value = $("#led").val();
    //$('#led').val('on').slider("disable");
    if(value == "on"){
        socket.emit('turnOn');
    }
    else {
        socket.emit('turnOff');
    }

    });
  */

  $('#setTemp').change(function() {
    $('#done').removeClass('ui-disabled');
  });


  $('#turnOn').click(function() {
            socket.emit('turnOn');
    });

    $('#turnOff').click(function() {
            socket.emit('turnOff');
    });  
});
