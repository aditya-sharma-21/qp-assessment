import express from "express";

const app = express();

app.use("/", (req, res, next) => {
  return res.send("Hello World");
});

app.listen(3000, () => {
  console.log("App is runnig on port :- 3000");
});
