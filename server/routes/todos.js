const express = require("express");
const todosControllers = require("../controllers/todos");

const router = express.Router();

router.use(express.json());

router.post("/todos", todosControllers.createTodo);

router.get("/todos", todosControllers.getAllTodos);
router.get("/todos/:todoId", todosControllers.getTodo);

router.put("/todos/:todoId", todosControllers.updateTodo);

router.delete("/todos/:todoId", todosControllers.deleteTodo);

module.exports = {
  todosRoute: router,
}