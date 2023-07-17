import * as dotenv from 'dotenv';
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { submitFormRoute } from './routes/form.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT;

// mongoose connection //

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(()=>console.log("MongoDB is connected"))
    .catch((err)=>console.log(err));


// setting the routes//
app.use("/submit",submitFormRoute);

app.get("/",(req,res)=>{
    res.send("This backend has been created to collect the form data , It is the task from Cavintek")
})

// setting the port//

app.listen(PORT,()=>console.log("Server is connected on the port",PORT))