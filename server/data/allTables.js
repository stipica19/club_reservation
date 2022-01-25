import mongoose from "mongoose";
import Table from "../models/table.js";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
let tableData = fs.readFileSync(__dirname + "/data/allTables.json");
tableData = JSON.parse(tableData).tables;

let allTables = [];
tableData.forEach((table) => {
  allTables.push(new Table(table));
});
//console.log(allTables);

export default allTables;
