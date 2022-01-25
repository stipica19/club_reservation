import mongoose  from "mongoose";

const reservationSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        require: true,
      },
      telbroj:{
          type:String,
          require:true,
      },
      opis:{
          type:String
      },
      event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
      },
      table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
        required: true,
      }
    }
  );

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;