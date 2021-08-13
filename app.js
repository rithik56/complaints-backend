const express = require("express");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());

dotenv.config({ path: "./config.env" });

require("./connection/conn");
require("./model/schema");

const PORT = process.env.PORT;

const middleware = async (req, res, next) => {
  console.log("hi i am middleware");
  next();
};

app.use("/auth", require("./router/auth"));

app.listen(PORT, () => {
  console.log(`server is set up at ${PORT}`);
});
