import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);

    const handleSave = () => {
        if (editedTitle.trim() && editedDescription.trim()) {
            onEdit(task._id, editedTitle.trim(), editedDescription.trim());
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditedTitle(task.title);
        setEditedDescription(task.description);
        setIsEditing(false);
    };

    return (
        <li className="flex flex-col bg-gray-100 px-4 py-3 rounded-xl mb-2">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        placeholder="Edit title"
                        className="mb-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        placeholder="Edit description"
                        className="mb-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <div className="flex justify-end">
                        <button onClick={handleSave} className="text-green-600 ml-2 hover:text-green-800">
                            💾
                        </button>
                        <button onClick={handleCancel} className="text-gray-500 ml-2 hover:text-gray-700">
                            ✖️
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div
                        onClick={() => onToggle(task._id)}
                        className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}
                    >
                        <p className="font-semibold">{task.title}</p>
                        <p className="text-sm text-gray-600">{task.description}</p>
                        {/* 👇 Username display */}
                        <p className="text-xs text-purple-500 italic mt-1">
                            Assigned to: {task?.user?.username || "Unassigned"}
                        </p>
                    </div>
                    <div className="flex justify-end mt-2">
                        <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700 ml-2">
                            ✏️
                        </button>
                        <button onClick={() => onDelete(task._id)} className="text-red-500 hover:text-red-700 ml-2">
                            ❌
                        </button>
                    </div>
                </>
            )}
        </li>
    );
}

export default TaskItem;
