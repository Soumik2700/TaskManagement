import Task from "../Model/task.model.js";


export async function createTask(req, res) {
    const { title, description, userId, completed } = req.body;

    if (!title || !description || !userId || completed === undefined) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const task = new Task({
            title, description, completed,

            user:userId
        })

        const savedTask = await task.save();
        if(!savedTask){
            return res.status(400).json({message: "Error saving task!"});
        }else{
            res.status(201).send(savedTask);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function updateTask(req, res){
    const {id} = req.params;
    const {title, description} = req.body;

    if(!id){
        return res.status(400).json({message:"Task id is required!"});
    }

    if(!title && !description){
        return res.status(400).json({message: "Atleast one field is required"})
    }

    try{
        const task = await Task.findOne({_id:id});

        if(!task){
            return res.status(404).json({message:"No task found!"});
        }
        
        if(title){
            task.title = title;
        }

        if (description) {
            task.description = description;
        }

        const savedTask = await task.save();
        if(!savedTask){
            return res.status(400).json({message: "Error updating task!"});
        }else{
            res.status(200).json({
                message: "Updated Sucessfully",
                savedTask
            });
        }

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export async function readTask(req, res){
    try{
        const allTask = await Task.find().populate("user", "username");
        if(!allTask){
            return res.status(400).json({message:"No task found!"});
        }else{
            res.status(200).send(allTask);
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export async function deleteTask(req, res){
    const {id} = req.params;

    if(!id){
        return res.status(400).json({message: "Task id required!"});
    }

    try{
        const task = await Task.deleteOne({_id:id});
        if(!task){
            return res.status(400).json({message: "unable to delete task!"});
        }

        res.status(200).json({message: "Task deleted sucessfully!"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}