const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  console.log("BUS Post Received Event", req.body.type);
  axios.post("http://posts-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  }); // Posts Service
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  }); // Comments Service
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  }); // Query Service
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  }); // Moderation Service
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  console.log("BUS Get Received Event");
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on port 4005");
});
