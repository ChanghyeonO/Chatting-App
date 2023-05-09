//여기가 백
const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const socketIO = require("socket.io");
const moment = require("moment");

const io = socketIO(server);

app.use(express.static(path.join(__dirname, "src")));

const PORT = process.env.PORT || 8000;
//만약에 process환경에 PORT가 지정되어있을 경우 그걸 사용 아니면 8000번 포트 사용

io.on("connection", socket => {
  socket.on("chatting", data => {
    console.log(data);
    const { name, message, time } = data;
    io.emit("chatting", {
      name,
      message,
      time: moment(new Date()).format("h:mm A"),
    });
  });
});

server.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
