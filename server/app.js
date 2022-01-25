import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import twilio from "twilio";
const app = express();

import eventRoute from "./routes/eventRoute.js";

import reservationRoute from "./routes/reservationRoute.js";
import tableRoute from "./routes/tableRoutes.js";

const connection_url =
  "mongodb+srv://stipica11:stipo123@cluster0.ielh6.mongodb.net/rezervacije?retryWrites=true&w=majority";
app.use(Cors());
app.use(express.json());

//DB CONFIG
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("DB connected");
});
const serviceID = "VA6ba6f7c94a9212be7f0fe9ba1ea891a2";
const accountID = "ACe25860432a4e336ff892ee5ca480c9b0";
const authid = "5e7134e0f4e391b4f30a512fd6b0cf75";

const client = new twilio(accountID, authid);

app.use("/event", eventRoute);
app.use("/reservation", reservationRoute);
app.use("/table", tableRoute);

app.listen(5000, (req, res) => {
  console.log("SERVER JE STARTOVAN NA PORTU 5000");
});
/*
router.get("/login", (req, res) => {
  console.log("aaaaaaaaaaa");
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

// Verify Endpoint
router.get("/addReservation", (req, res) => {
  console.log();
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
});*/
