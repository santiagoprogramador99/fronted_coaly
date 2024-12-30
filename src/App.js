import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

const App = () => {
  const [tasks, setTasks] = useState([]); 
  const [filter, setFilter] = useState("all"); 
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCreateTask = async () => {
    if (!newTask.title) return alert("Title is required");
    try {
      await axios.post("/api/tasks", newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await axios.put(`/api/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

        {/* Formulario de creación de tareas */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Task Title"
            className="border p-2 mr-2"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Task Description (optional)"
            className="border p-2 mr-2"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleCreateTask}
          >
            Add Task
          </button>
        </div>

        {/* Filtros */}
        <div className="mb-4">
          <button
            className={`px-4 py-2 mr-2 ${filter === "all" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 mr-2 ${filter === "completed" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2 ${filter === "pending" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>

        {/* Lista de tareas */}
        <ul className="list-none">
          {filteredTasks.map((task) => (
            <li key={task._id} className="flex justify-between items-center border-b p-2">
              <div>
                <h2 className="text-lg font-bold">
                  {task.title} {task.completed && <span className="text-green-500">(Completed)</span>}
                </h2>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-xs text-gray-500">Created At: {new Date(task.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center">
                <Link to={`/tasks/${task._id}`}>
                  <button className="bg-blue-500 text-white px-2 py-1 mr-2 rounded">
                    View
                  </button>
                </Link>
                <button
                  className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                  onClick={() => handleToggleComplete(task._id, task.completed)}
                >
                  {task.completed ? "Mark as Pending" : "Mark as Completed"}
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

// Componente Home para la ruta raíz
const Home = () => (
  <div>
    <h2>Welcome to the Task Manager</h2>
    <p>Click on a task to view more details.</p>
  </div>
);

// Componente para mostrar y actualizar los detalles de una tarea
const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchTaskDetail = async () => {
      try {
        const response = await axios.get(`/api/tasks/${id}`);
        setTask(response.data);
        setUpdatedTask({ title: response.data.title, description: response.data.description });
      } catch (error) {
        console.error('Error fetching task detail:', error);
      }
    };

    fetchTaskDetail();
  }, [id]);

  const handleUpdateTask = async () => {
    try {
      await axios.put(`/api/tasks/${id}`, updatedTask);
      setIsEditing(false);
      setTask({ ...task, ...updatedTask });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>{task.completed ? 'Completed' : 'Pending'}</p>
      <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>

      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTask.title}
            onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
            placeholder="Update Title"
          />
          <input
            type="text"
            value={updatedTask.description}
            onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
            placeholder="Update Description"
          />
          <button onClick={handleUpdateTask}>Update Task</button>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit Task</button>
      )}
    </div>
  );
};

export default App;

