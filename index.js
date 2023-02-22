// require your server and launch it
const server = require("./api/server"); //servere import ettik
const PORT = 8000; //port tanımladık.

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
