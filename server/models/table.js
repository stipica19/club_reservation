import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  isAvailable: {
    type: Boolean,
    require: true,
    default: false,
  },
  x: {
    type: String,
  },
  y: {
    type: String,
  },
});

const Table = mongoose.model("Table", tableSchema);
export default Table;
