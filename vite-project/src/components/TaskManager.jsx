import { useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import axios from "axios";

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    const [hasTaskAdded, setHasTaskAdded] = useState(false);

    // ✅ Fetch tasks from API
    useEffect(() => {
        async function getTask() {
            try {
                const response = await axios.get(`http://localhost:3000/api/readTask`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });

                const data = response.data;
                // console.log(data);
                setTasks(data); // ✅ Set fetched tasks
            } catch (err) {
                alert("Failed to fetch tasks: " + err.message);
            }
        }

        getTask();
    }, [authToken, hasTaskAdded]);

    // ✅ Add task (locally for now)
    const addTask = async (title, description) => {
        const newTask = {
            title,
            description,
            userId,
            completed: false
        };

        try {
            const response = await axios.post(
                `http://localhost:3000/api/createTask`,
                newTask,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // ✅ Include token
                        "Content-Type": "application/json"
                    }
                }
            );

            const data = response.data;
            // console.log(data)
            // ✅ Update task list with new task from server (in case server sends back full task with id)
            setTasks(prevTasks => [...prevTasks, data]);
            setHasTaskAdded(!hasTaskAdded);

        } catch (err) {
            alert("Failed to add task: " + err.message);
        }
    };


    const toggleComplete = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const editTask = async (id, newTitle, newDescription) => {
        // console.log(id);
        try {
            const response = await axios.put(
                `http://localhost:3000/api/updateTask/${id}`,
                {
                    title: newTitle,
                    description: newDescription
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // ✅ Make sure authToken is valid
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 200) {
                setTasks(tasks.map(task =>
                    task._id === id ? { ...task, title: newTitle, description: newDescription } : task
                ));
            } else {
                alert("Failed to edit data: Server responded with error");
            }
        } catch (err) {
            alert("Failed to edit data: " + err.message);
        }
    };


    const deleteTask = async (id) => {
        try{
            const response = await axios.delete(`http://localhost:3000/api/deleteTask/${id}`,{
                headers:{
                    Authorization: `Bearer ${authToken}`
                }
            })

            console.log(response);

            setTasks(tasks.filter(task => task._id !== id));
        }catch(err){
            alert("Failed delete task: ", err.message);
        }
    };

    return (
        <div className="min-h-screen bg-purple-50 py-10 px-4 flex justify-center">
            <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-xl">
                <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
                    📝 Task Manager
                </h1>
                <TaskInput onAdd={addTask} />
                <TaskList
                    tasks={tasks}
                    onToggle={toggleComplete}
                    onDelete={deleteTask}
                    onEdit={editTask}
                />
            </div>
        </div>
    );
}

export default TaskManager;
