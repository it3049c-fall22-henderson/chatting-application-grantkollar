
const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const testP = document.getElementById("test");


function fetchMessages(){
  return fetch(`https://it3049c-chat-application.herokuapp.com/messages`)
  .then(response => response.json());
}
async function updateMessages(){
  const response = await fetchMessages();
  console.log(response);
}
updateMessages();