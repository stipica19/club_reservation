import express from "express";
const router = express.Router();
import Event from "../models/event.js";
import Reservation from "../models/reservation.js";
import Table from "../models/table.js";
import twilio from "twilio";
//Dohvacanje svih rezervacija-a
/*
router.get("/", async (req, res) => {
  const reservation = await Reservation.find({});
  res.json(reservation);
});
//Dohvacanje jedne rezervacije
router.get("/:id", async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  res.json(reservation);
});
*/
const serviceID = "VA6ba6f7c94a9212be7f0fe9ba1ea891a2";
const accountID = "ACe25860432a4e336ff892ee5ca480c9b0";
const authid = "5e7134e0f4e391b4f30a512fd6b0cf75";

const client = new twilio(accountID, authid);

router.get("/verify", (req, res) => {
  console.log(req.query);
  if (req.query.phonenumber && req.query.code.length === 4) {
    client.verify
      .services(serviceID)
      .verificationChecks.create({
        to: `+${req.query.phonenumber}`,
        code: req.query.code,
      })
      .then((data) => {
        if (data.status === "approved") {
          res.status(200).send({
            message: "User is Verified!!",
            data,
          });
        }
      });
  } else {
    res.status(400).send({
      message: "Wrong phone number or code :(",
      phonenumber: req.query.phonenumber,
      data,
    });
  }
});

router.get("/log", (req, res) => {
  if (req.query.phonenumber) {
    console.log("aaaa");
    client.verify
      .services(serviceID)
      .verifications.create({
        to: `+${req.query.phonenumber}`,
        channel: req.query.channel === "call" ? "call" : "sms",
      })
      .then((data) => {
        res.status(200).send({
          message: "Verification is sent!!",
          phonenumber: req.query.phonenumber,
          data,
        });
      });
  } else {
    res.status(400).send({
      message: "Wrong phone number :(",
      phonenumber: req.query.phonenumber,
      data,
    });
  }
});

router.post("/addReservation", async (req, res) => {
  const { name, telbroj, opis, event, table } = req.body;

  const reservationExists = await Event.findById(event);

  const provjeraStola = reservationExists.tables.some(
    (r) => r.id === table && r.isAvailable === true
  );
  console.log("Provjera stola : " + provjeraStola);

  if (!provjeraStola) {
    res.status(400);
    throw new Error("Reservacija na tom stolu vec postoji");
  }

  const item = await Event.findOneAndUpdate(
    { _id: event, "tables._id": table },
    { $set: { "tables.$.isAvailable": false } }
  );

  const reservation = Reservation.create({
    name,
    telbroj,
    opis,
    event,
    table,
  });
  if (reservation) {
    res.status(201).json({
      _id: reservation._id,
      name: reservation.name,
      telbroj: reservation.telbroj,
      opis: reservation.opis,
      event: reservation.event,
      tables: reservation.tables,
    });
  } else {
    res.status(400);
    throw new Error("Pogrešni podaci za rezervaciju");
  }
});

export default router;
