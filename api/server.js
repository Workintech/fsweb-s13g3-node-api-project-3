const express = require('express');
const { logger } = require('./middleware/middleware');
const userRouter = require("./users/users-router");


//const {}

const server = express();

// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın
server.use(express.json());
server.use(logger);
// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

server.use("/api/users", userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

server.use((req, res, next) => {
  res.status(404).json({ message: "not found" });
});

server.use((req, res, next) => {
  res.status(500).json({ message: "server error" });
});

module.exports = server;
