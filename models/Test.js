import mongoose from "mongoose";
const { Schema, model } = mongoose;

const testSchema = new Schema({
    test:String
});
const Test = mongoose.models.Test || model("Test", testSchema);
export default Test;
