const express = require("express");
const hotelsRouter = require("./router/hotelsRouter");
const restaurantsRouter = require("./router/restaurantsRouter");
const app = express();

app.use(express.json());
app.get("/", (_req, res) => {
  res.send("...");
});

app.use("/hotels", hotelsRouter);
app.use("/restaurants", restaurantsRouter);

app.get("*", (_req, res) => {
  res.status(404).send("error 404");
});
app.listen(8000, () => {
  console.log("Listening...");
});
