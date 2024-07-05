import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ToDoList.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  function fetchTodos() {
    axios
      .get("http://localhost:8000/api/todos")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("please check your form");
        } else if (err.response.status === 500) {
          alert(err.response.data.msg);
        }
      });
  }

  const addNewTask = (event) => {
    event.preventDefault();

    if (editingTaskId) {
      // Editing task
      axios
        .put(`http://localhost:8000/api/todos/${editingTaskId}`, {
          title: newTaskTitle,
        })
        .then((res) => {
          fetchTodos();
          setEditingTaskId(null);
          setNewTaskTitle("");
        })
        .catch((err) => {
          if (err.response.status === 400) {
            alert("please check your form");
          } else if (err.response.status === 500) {
            alert(err.response.data.msg);
          }
        });
    } else {
      // Adding a new task
      axios
        .post("http://localhost:8000/api/todos", {
          title: event.target.newTask.value,
        })
        .then((res) => {
          fetchTodos();
          event.target.newTask.value = "";
        })
        .catch((err) => {
          if (err.response.status === 400) {
            alert("please check your form");
          } else if (err.response.status === 500) {
            alert(err.response.data.msg);
          }
        });
    }
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:8000/api/todos/${taskId}`)
      .then((res) => {
        fetchTodos();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("Error deleting task");
        } else if (err.response.status === 500) {
          alert(err.response.data.msg);
        }
      });
  };
  const handleTaskCompletion = (taskId) => {
    const isCompleted = completedTasks.includes(taskId);

    axios
      .put(`http://localhost:8000/api/todos/${taskId}`, {
        completed: !isCompleted,
      })
      .then((res) => {
        if (isCompleted) {
          setCompletedTasks(completedTasks.filter((id) => id !== taskId));
        } else {
          setCompletedTasks([...completedTasks, taskId]);
        }
        fetchTodos(); 
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("Error updating task completion status");
        } else if (err.response.status === 500) {
          alert(err.response.data.msg);
        }
      });
  };

  return (
    <div className="todo-container">
      <h2>To Do List</h2>
      <form onSubmit={addNewTask} action="addNewTask">
        <input type="text" name="newTask" />
        <button>Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={completedTasks.includes(task._id)}
              onChange={() => handleTaskCompletion(task._id)}
            />
            <span
              style={{
                textDecoration: completedTasks.includes(task._id)
                  ? "line-through"
                  : "none",
              }}
            >
              {task.title}
            </span>
            {editingTaskId === task._id ? (
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            ) : null}
            {editingTaskId === task._id ? (
              <button onClick={addNewTask}>Save</button>
            ) : (
              <button
                className="edit-btn"
                onClick={() => {
                  setEditingTaskId(task._id);
                  setNewTaskTitle(task.title);
                }}
              >
                Edit
              </button>
            )}
            <button onClick={() => deleteTask(task._id)} className="delete-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
