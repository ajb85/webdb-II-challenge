const server = require("./server.js");

server.listen((port = 3300), function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
