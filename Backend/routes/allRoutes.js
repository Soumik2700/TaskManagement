import { createTask, updateTask, readTask, deleteTask } from "../controller/task.controller.js";
import { createUser, loginUser } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/middleware.js";

export function routes(app) {
    app.post("/api/createTask", verifyToken, createTask);
    app.put("/api/updateTask/:id", verifyToken, updateTask);
    app.get("/api/readTask", verifyToken, readTask);
    app.delete("/api/deleteTask/:id", verifyToken, deleteTask);
    app.post("/api/createUser", createUser);
    app.post("/login", loginUser);
}