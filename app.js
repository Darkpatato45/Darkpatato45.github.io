const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chat App</title>
            <script src="/socket.io/socket.io.js"></script>
            <style>
                body { font-family: Arial, sans-serif; }
                #messages { list-style-type: none; padding: 0; }
                #messages li { padding: 5px; }
            </style>
        </head>
        <body>
            <h1>Messagerie Instantanée</h1>
            <ul id="messages"></ul>
            <input id="messageInput" autocomplete="off" /><button id="sendButton">Envoyer</button>

            <script>
                const socket = io();

                const messageInput = document.getElementById('messageInput');
                const sendButton = document.getElementById('sendButton');
                const messages = document.getElementById('messages');

                sendButton.onclick = function() {
                    const message = messageInput.value;
                    socket.emit('message', message);
                    messageInput.value = '';
                };

                socket.on('message', function(msg) {
                    const item = document.createElement('li');
                    item.textContent = msg;
                    messages.appendChild(item);
                    window.scrollTo(0, document.body.scrollHeight);
                });
            </script>
        </body>
        </html>
    `);
});

io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    socket.on('message', (msg) => {
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${PORT}`);
});
