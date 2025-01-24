import React, { useState, useEffect } from "react";
import { useSharedCode } from "../Context/SharedCodeContext"; // Get shared code from context

const Tolistpage = () => {
  const { sharedCode } = useSharedCode(); // Get the shared code from context
  const [toDoList, setToDoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the To-Do list for the shared code
  useEffect(() => {
    if (!sharedCode) return; // Don't fetch if there's no shared code

    const fetchToDoList = async () => {
      try {
        const response = await fetch(
          `https://sharedtodo-backend.onrender.com/api/user/findToDoList/${sharedCode}`
        );
        if (response.ok) {
          const data = await response.json();
          setToDoList(data.toDoList || []);
        } else {
          setError("Failed to fetch To-Do list.");
        }
      } catch (err) {
        setError("Error fetching To-Do list.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchToDoList();
  }, [sharedCode]); // Re-fetch when sharedCode changes

  // Handle adding a new task
  const handleAddTask = async () => {
    if (!newTask) {
      alert("Please enter a task.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://sharedtodo-backend.onrender.com/api/user/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: sharedCode,  // Use sharedCode from context
          task: newTask,
        }),
      });

      if (response.ok) {
        const updatedList = await response.json();
        setToDoList(updatedList.toDoList);
        setNewTask(""); // Reset task input
      } else {
        alert("Failed to add task.");
      }
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Error adding task.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 via-pink-300 to-yellow-200">
      <div className="bg-white shadow-xl rounded-lg p-8 w-96">
      <h2 className="text-xl font-medium text-center text-gray-600 mb-4">
            To-Do List for SweetHeart❤️ & You ❤️
          </h2>
    
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-4">Our Shared To-Do List</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <ul className="space-y-4">
          {toDoList.length === 0 ? (
            <p className="text-center text-gray-500">No tasks available. Start adding some!</p>
          ) : (
            toDoList.map((task, index) => (
              <li
                key={index}
                className="flex items-center p-3 bg-pink-100 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  className="mr-3 border-2 rounded-full"
                />
                <span className={`text-lg ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                  {task.task}
                </span>
              </li>
            ))
          )}
        </ul>
        <div className="mt-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full px-4 py-2 border-2 border-pink-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-400"
            placeholder="Enter a new task"
          />
          <button
            onClick={handleAddTask}
            className="w-full mt-4 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition duration-200"
          >
            Add Task ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tolistpage;
