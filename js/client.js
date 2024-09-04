const socket = io("http://localhost:8000")
const form = document.getElementById('send-container');
const messageInput = document.getElementById('chat');
const messageContainer = document.querySelector('.container');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (messageInput.value === '') {
        alert("Enter a message to send")
    }
    else {
        const message = messageInput.value;
        append(`You: ${message}`, 'right');
        socket.emit('send', message);
        messageInput.value = '';
    }
})

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name}: joined the chat`, 'left');
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', data => {
    append(`${data}: left the chat`, 'left');
});
