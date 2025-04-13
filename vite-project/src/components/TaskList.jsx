import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
    // console.log(tasks)
    if (tasks.length === 0) {
        return <p className="text-gray-500 text-center">No tasks added yet.</p>;
    }

    return (
        <ul className="space-y-3">
            {tasks.map(task => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
}

export default TaskList;
