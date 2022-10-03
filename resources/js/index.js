const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const usernameButton = document.getElementById("save-username")
const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;
const darkModeButton = document.getElementById("dark-mode");
let darkmodeEnabled = false;
function fetchMessages(){
  return fetch(serverURL)
  .then(response => response.json());
}
async function updateMessages(){
  const messages = await fetchMessages();
  let formattedMessages = "";
  messages.forEach(message => {
      formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
  
}
function darkMode(){
    darkModeButton.addEventListener("click", function(){
        if(!darkmodeEnabled){
        darkmodeEnabled = true;
        document.body.style.background = "rgb(27, 27, 27)";
        document.querySelector('footer').style.background = "rgb(27, 27, 27)";
        document.getElementById("jumbo").style.background = "rgb(27, 27, 27)";
        document.querySelector("h1").style.color = "white"
        }
        else{
        darkmodeEnabled = false;
        document.body.style.background = "white";
        document.querySelector('footer').style.background = "white";
        document.getElementById("jumbo").style.background = "rgb(235, 235, 235)";
        document.querySelector("h1").style.color = "black"
        }

    });
}
function userName(){
myMessage.disabled = true;
if(localStorage.getItem('username') != null){
    nameInput.value = localStorage.getItem('username')
    myMessage.disabled = false;
}
usernameButton.addEventListener("click",function(usernameClickEvent){
usernameClickEvent.preventDefault();
localStorage.setItem('username',nameInput.value);
myMessage.disabled = false;
});
}
function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
      return `
      <div class="mine messages">
          <div class="message">
              ${message.text}
          </div>
          <div class="sender-info">
              ${formattedTime}
          </div>
      </div>
      `
  } else {
      return `
          <div class="yours messages">
              <div class="message">
                  ${message.text}
              </div>
              <div class="sender-info">
                  ${message.sender} ${formattedTime}
              </div>
          </div>
      `
  }
}
function sendMessages(username, text) {
  const newMessage = {
      sender: username,
      text: text,
      timestamp: new Date()
  }

  fetch (serverURL, {
      method: `POST`, 
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
  });
}
darkMode();
userName();
updateMessages();
setInterval(updateMessages, 10000);


sendButton.addEventListener("click", function(sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;

  sendMessages(sender,message);
  myMessage.value = "";
});