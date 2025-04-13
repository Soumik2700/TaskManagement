import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes/allRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://soumiksingha8:nPsF07P4qjhqvuyw@cluster0.cyzudli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const db = mongoose.connection;

db.on("open", () => {
    console.log("connection sucessfull");
})

db.on("error", () => {
    console.log("connection not sucessfull");
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
})

routes(app);

//nPsF07P4qjhqvuyw