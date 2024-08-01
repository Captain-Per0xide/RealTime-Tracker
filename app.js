const express = require('express');
const app = express();
const socketio = require('socket.io');
const server = require('http').createServer(app);
const path = require('path');

const io = socketio(server);

io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    socket.on("send-location", (data) => {
        console.log("Location received from:", socket.id, "Data:", data);
        io.emit("receive-location", { id: socket.id, ...data });  // Corrected spelling here
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        io.emit("user-disconnected", socket.id);
    });
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
