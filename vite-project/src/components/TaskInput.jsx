import { useState } from "react";

function TaskInput({ onAdd }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            alert("Please fill in both title and description.");
            return;
        }

        onAdd(title, description); // ✅ Call TaskManager's addTask
        setTitle(""); // Reset input
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <input
                type="text"
                placeholder="Enter task title"
                className="w-full mb-2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Enter task description"
                className="w-full mb-2 px-4 py-2 border rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
            />
            <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md w-full font-semibold"
            >
                Add Task
            </button>
        </form>
    );
}

export default TaskInput;
