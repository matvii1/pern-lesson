const { pool } = require("../db");

const createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    console.log(req.body);

    const newTodo = pool.query(
      `
      INSERT INTO todo (description) VALUES($1) RETURNING *
    `,
      [description]
    );

    res.send(newTodo);
  } catch (err) {
    console.error(err);
  }
}

const getAllTodos = async (req, res) => {
  try {
    const allTodos = await pool.query(`SELECT * FROM todo ORDER BY todo_id`);
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error);
  }
}

const getTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const selectedTodo = await pool.query(
      `
      SELECT * FROM todo
      WHERE todo_id = $1
    `,
      [todoId]
    );

    res.json(selectedTodo.rows);
  } catch (error) {
    console.log(error);
  }
}

const updateTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { description } = req.body;
    const updatedTodo = await pool.query(
      `
        UPDATE todo SET description = $1 WHERE todo_id = $2
    `,
      [description, todoId]
    );

    res.json("Todo was updated");
  } catch (error) {
    console.log(error);
  }
}

const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const deletedTodo = pool.query(`DELETE FROM todo WHERE todo_id = $1`, [
      todoId,
    ]);

    res.json("Todo was deleted");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createTodo,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
}