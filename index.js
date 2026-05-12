// require your server and launch it
const server = require("./api/server");


server.listen(port, () => {
    console.log("server is working at" + port);
})