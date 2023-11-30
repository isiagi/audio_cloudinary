const http = require("http");
const app = require("./app");

const connect = require("./db/connect");

const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

async function connectAsync() {
  try {
    await connect();
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log("Error connecting");
  }
}

connectAsync();
