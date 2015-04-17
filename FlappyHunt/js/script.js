var close = document.getElementById("close");
var send = document.getElementById("send");

socket = new WebSocket("ws://localhost:9002", "echo-protocol");

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
  message.textContent = "";
  socket.close();
  console.log("close")
});

send.addEventListener("click", function(event) {
  socket.send(text);
  text.value = "";
});