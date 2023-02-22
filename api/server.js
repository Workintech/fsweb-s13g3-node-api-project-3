const express = require("express"); //express import edildi.

const server = express(); //express instance yarattık
const { logger } = require("./middleware/middleware");
// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın
server.use(express.json());
const userRouter = require("./users/users-router");
// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

server.use(logger);
server.use("/api/users", userRouter);
server.get("/", (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

module.exports = server;
