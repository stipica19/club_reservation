import express from "express";
const router = express.Router();
import Event from "../models/event.js";
import Reservation from  "../models/reservation.js";
import Table from "../models/table.js";


//Dohvacanje svih rezervacija-a
router.get("/", async (req, res) => {
    const table = await Table.find({});
    res.json(table);
  });
  
  //Dodavanje reservacije
  router.post("/addTable", async (req, res) => {
    const { name } = req.body;
  
    const tableExists = await Table.findOne({ name });
  
    if (tableExists) {
      res.status(400);
      throw new Error("Stol vec postoji s tim brojem!!!!!!!!!");
    }
  
    const table = await Table.create({
         name,
         
    });
    if (table) {
      res.status(201).json({
      name
      });
    } else {
      res.status(400);
      throw new Error("Pogrešni podaci za stol");
    }
  });


  export default router;