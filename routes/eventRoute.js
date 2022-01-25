import express from "express";
const router = express.Router();
import Event from "../models/event.js";
import Table from "../models/table.js";
import allTables from "../data/allTables.js";

//Dohvacanje svih event-a
router.get("/", async (req, res) => {
  const events = await Event.find({});
  res.json(events);
});

//Dohvacanje jednog eventa
router.get("/:id", async (req, res) => {
  const events = await Event.findById(req.params.id);
  res.json(events);
});

//Dodavanje event-a
router.post("/addEvent", async (req, res) => {
  const { name, datum } = req.body;

  const eventExists = await Event.findOne({ datum });

  if (eventExists) {
    res.status(400);
    throw new Error("Event vec postoji");
  }

  const event = await Event.create({
    name,
    datum,
    tables: allTables,
  });
  if (event) {
    res.status(201).json({
      _id: event._id,
      name: event.name,
      datum: event.datum,
    });
  } else {
    res.status(400);
    throw new Error("Pogrešni podaci za event");
  }
});

export default router;
