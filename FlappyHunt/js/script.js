$(document).ready(function(){
    var windowWidth = $(window).width();
    var panelWidth = $('.gamePanel').width();
    $('.gamePanel').css('left', ((windowWidth-panelWidth)/2) + 'px');

    $('#beginGame').click(function(){
        $('.menuGame').animate({top: '-300px'},2000, function(){
            $(this).remove();
            setTimeout(function(){
                $('.playersTable').animate({top: '300px'},2000);
                $('#tlo').css('filter','none');
            });
        });

    });

    $('.playersTable').click(function(){
        $(this).animate({opacity: 0},2000);
        $('.gamePanel').animate({opacity: 1},2000);
    });

  var close = document.getElementById("close");
  var send = document.getElementById("send");
  var ul = document.getElementById("ull");

  socket = new WebSocket("ws://192.168.0.17:9999", "echo-protocol");

  socket.addEventListener("open", function(event) {
    status.textContent = "Connected";
    console.log("Connected");
  });

  socket.addEventListener("message", function(event) {
    var element = document.createElement('li');
    element.innerHTML = event.data;
    ul.appendChild(element); 
    console.log("message");
  });

  socket.addEventListener("error", function(event) {
    alert('Error');
    console.log("error");
  });

  socket.addEventListener("close", function(event) {
    status.textContent = "Not Connected";
    console.log("Not Connected");
  });


  close.addEventListener("click", function(event) {

    socket.close();
    console.log("close")
  });

  send.addEventListener("click", function(event) {
    var text = "placuszki";
    send(text, function(res){console.log("poszlo",res)})
  });

  var send = function (message, callback) {
      console.log("leci", message)
      waitForConnection(function () {
          console.log("nakurwia wegorza")
          for(var i =0; i<10000; i++)
          {
              setTimeout(function () {
              socket.send(message);
          }, 100);
          }
          console.log("poszlo")
          if (typeof callback !== 'undefined') {
            callback();
          }
      }, 1000);
  };

  var waitForConnection = function (callback, interval) {
      if (socket.readyState === 1) {
          console.log("zaczyna");
          callback();
      } else {
          console.log("cos nie tak", socket.readyState, socket)
          var that = this;
          // optional: implement backoff for interval here
          setTimeout(function () {
              waitForConnection(callback, interval);
          }, interval);
      }
  }

})
