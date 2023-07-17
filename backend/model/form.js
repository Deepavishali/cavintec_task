import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    selectfield: String
});

export default mongoose.model("form", formSchema);

