import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World2332");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
