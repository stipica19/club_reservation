import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const zauzet =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAASFBMVEX/AAD/fX3/jIz/m5v/q6v/uLj/trb/qan/ior/gYH/2dn/dHT/eHj//Pz/8/P/5OT/z8//yMj/srL/kZH/lZX/oKD/rq7/pKT5lJt8AAABl0lEQVR4nO3dS24CMRAG4TYzw2MgDwiQ+980WWQRZROE1GqVXZ8v8NfSkiXHy+vb+n4+L8tymed5N/342Py2b087bP51nR5wmx9wX/7arnGJvh1jrp6QrA1Q+Fk9IVmLqXpCMgv5LOSzkM9CPgv5Rii8Vk9I1mJTPSGZhXwW8lnIZyGfhXwW8lnIZyGfhXwW8lnIZyGfhXwW8lnIN0LhvnpCsvZ9+mYhn4V8FvJZyGchn4V8FvJZyGchn4V8FvJZyGchn4V8FvJZyGchn4V8FvK1OFRPSDbCi6H+X31ZSGchn4V8FvJZyGchn4V8FvJZyGchn4V8FvJZyGchn4V8FvJZyGchn4V8IxT2/8+MhXQW8lnIZyGfhXwW8lnIZyGfhXwW8lnIZyGfhXwW8lnIZyGfhXwjFN6qJyRrsauekKzFXD0hmYV8FvJZyGchn4V8FvJZyGchn4V8FvJZyGchn4V8FvJZyGchn4V8Le7VE5K12FZPSNZiqZ6QzEI+C/ks5LOQz0I+C/ks5BuhsPcb8CnWY+vZafkCI00HxRaYb6EAAAAASUVORK5CYII=";
const slobodan =
  "https://e7.pngegg.com/pngimages/572/684/png-clipart-square-border-illustration-square-black-and-white-fuchsia-frame-miscellaneous-angle-thumbnail.png";
function App() {
  const [isLoading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [table, setTable] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [stol, setStol] = useState("");
  const [eventChecked, setEventChecked] = useState("");
  const [name, setName] = useState("");
  const [telbroj, setTelBroj] = useState("");
  const [SmsKod, setSmsKod] = useState("");
  const [styleActiveTable, setStyleActiveTable] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("https://club-reservation.vercel.app/event");
      setEvents(res.data);
    };
    getData();
  }, []);

  const getTable = async (id) => {
    console.log("EVENT ID : ", id);
    const res = await axios.get(
      `https://club-reservation.vercel.app/event/${id}`
    );
    setTable(res.data);
    setLoading(false);
  };

  /*
  const handleRezervacija = async () => {
    console.log("event==", eventChecked);
    console.log("stol===", stol);
    const res = await axios.post(
      `https://club-reservation.vercel.app//reservation/addReservation`,
      {
        name: name,
        telbroj: telbroj,
        opis: "Opis neki",
        event: eventChecked,
        table: stol,
      }
    );
  };*/
  const handleSMS = () => {
    console.log(stol);
    if (stol) {
      const res = axios.get(
        `https://club-reservation.vercel.app/reservation/log?phonenumber=38763542702&channel=sms`
      );
    } else {
      console.log("nije odbran stol");
    }
  };

  const handlePotvrdi = () => {
    const res = axios
      .get(
        `https://club-reservation.vercel.app/reservation/verify?phonenumber=${telbroj}&code=${SmsKod}`
      )
      .then((res) => {
        const response = axios.post(
          `https://club-reservation.vercel.app/reservation/addReservation`,
          {
            name: name,
            telbroj: telbroj,
            opis: "Opis neki",
            event: eventChecked,
            table: stol,
          }
        );
      });
  };
  return (
    <div className="App">
      <div className="flex-container">
        <div className="flex-item-left">
          {" "}
          <h1>ODABERI EVENT</h1>
          {events.map((e) => (
            <div className="wrapper">
              <div className="input-data">
                <input
                  className="dugme"
                  type="button"
                  value={`${e.name} ${e.datum.slice(0, 10)}`}
                  onClick={() => {
                    setIsChecked(true);
                    getTable(e._id);
                    setEventChecked(e._id);
                  }}
                />
              </div>
            </div>
          ))}
          {isChecked && (
            <div>
              <div className="wrapper">
                <div className="input-data">
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>IME</label>
                </div>
              </div>
              <div className="wrapper">
                <div className="input-data">
                  <input type="text" />
                  <label>PREZIME</label>
                </div>
              </div>
              <div className="wrapper">
                <div className="input-data">
                  <input
                    type="text"
                    onChange={(e) => setTelBroj(e.target.value)}
                  />
                  <label>BROJ TEL</label>
                </div>
              </div>
              <div className="wrapper">
                <div className="input-data">
                  <input
                    className="dugme"
                    type="button"
                    value="SMS POTVRDA"
                    onClick={() => handleSMS(telbroj)}
                  />
                </div>
              </div>
              <div className="wrapper">
                <div className="input-data">
                  <input
                    type="text"
                    onChange={(e) => setSmsKod(e.target.value)}
                  />
                  <label>SMS KOD</label>
                </div>
              </div>
              <div className="wrapper">
                <div className="input-data">
                  <input
                    className="dugme"
                    type="button"
                    value="POTVRDI"
                    onClick={() => handlePotvrdi()}
                  />
                </div>
              </div>
              {/* <!-- <div className="wrapper">
                <div className="input-data">
                  <input
                    className="dugme"
                    type="button"
                    value="Rezerviraj"
                    onClick={() => handleRezervacija()}
                  />
                </div>
          </div>*/}
            </div>
          )}
        </div>
        <div className="flex-item-right">
          <svg viewBox="-25 -80 700 700" width="100%" height="100%">
            <g className="g1">
              <image
                className="shema"
                width={600}
                href="https://app.dalekaobala.ba/assets/img/stolovi.png"
              />
            </g>
            {!isLoading &&
              table.tables.map((t) => (
                <g key={t.name}>
                  <image
                    onClick={() => {
                      console.log("aaaa", t._id);
                      setStyleActiveTable(t.name);
                      setStol(t._id);
                    }}
                    className={t.name === styleActiveTable ? "active" : ""}
                    id={t.name}
                    width={30}
                    x={t.x}
                    y={t.y}
                    href={!t.isAvailable ? zauzet : slobodan}
                    alt={`${t.isAvailable}`}
                  />
                </g>
              ))}
          </svg>
        </div>
      </div>
    </div>

    /*<div className="App">
      <div className="flex-container">
        <div className="flex-item-left">
          {" "}
          <h1>ODABERI EVENT</h1>
          {events.map((e) => (
            <div className="wrapper">
              <div className="input-data">
                <input
                  className="dugme"
                  type="button"
                  value={`${e.name} ${e.datum.slice(0, 10)}`}
                  onClick={() => {
                    setIsChecked(true);
                    getTable(e._id);
                    setEventChecked(e._id);
                  }}
                />
              </div>
            </div>
          ))}
          {isChecked && (
            <div>
              <div className="wrapper">
                <div className="input-data">
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>IME</label>
                </div>
              </div>
              <div className="wrapper">
                <div className="input-data">
                  <input type="text" />
                  <label>PREZIME</label>
                </div>
              </div>
              <div className="wrapper">
                <div className="input-data">
                  <input
                    type="text"
                    onChange={(e) => setTelBroj(e.target.value)}
                  />
                  <label>BROJ TEL</label>
                </div>
              </div>
              <div className="wrapper">
                <div className="input-data">
                  <input
                    className="dugme"
                    type="button"
                    value="SMS POTVRDA"
                    onClick={() => handleSMS(telbroj)}
                  />
                </div>
              </div>
              <div className="wrapper">
                <div className="input-data">
                  <input
                    type="text"
                    onChange={(e) => setSmsKod(e.target.value)}
                  />
                  <label>SMS KOD</label>
                </div>
              </div>
              <div className="wrapper">
                <div className="input-data">
                  <input
                    className="dugme"
                    type="button"
                    value="POTVRDI"
                    onClick={() => handlePotvrdi()}
                  />
                </div>
              </div>
              <div className="wrapper">
                <div className="input-data">
                  <input
                    className="dugme"
                    type="button"
                    value="Rezerviraj"
                    onClick={() => handleRezervacija()}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex-item-right">
          <svg viewBox="-25 -80 700 700" width="100%" height="100%">
            <g>
              <image
                className="shema"
                width={600}
                href="https://app.dalekaobala.ba/assets/img/stolovi.png"
              />
            </g>
            {!isLoading &&
              table.tables.map((t) => (
                <g key={t.name}>
                  <image
                    onClick={() => {
                      console.log("aaaa", t._id);
                      setStol(t._id);
                    }}
                    id={t.name}
                    width={30}
                    x={t.x}
                    y={t.y}
                    href={!t.isAvailable ? zauzet : slobodan}
                    alt={`${t.isAvailable}`}
                  />
                </g>
              ))}
          </svg>
        </div>
      </div>
    </div>*/
  );
}

export default App;
