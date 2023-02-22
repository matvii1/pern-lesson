const express = require("express");
const cors = require("cors");
const { todosRoute } = require("../routes/todos.js");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(todosRoute)

app.listen(port, () => {
  console.log(`started on https://localhost:${port}`);
});
