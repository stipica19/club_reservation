import mongoose from "mongoose";
import tableSchema from "./table.js";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  datum: {
    type: Date,
    require: true,
  },
  tables: [{ name: String, isAvailable: Boolean, x: String, y: String }],
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
