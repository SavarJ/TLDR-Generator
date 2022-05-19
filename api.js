const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(cors());

const Answer = mongoose.model("Answer", require("./models/Answer.model"));

app.get("/answers", async (req, res) => {
  try {
    const answers = await Answer.find({});
    res.json({ data: answers, statusCode: 200 });
  } catch (err) {
    res.json({ data: err, statusCode: 500 });
  }
});

app.post("/answers", async (req, res) => {
  try {
    const answer = new Answer({
      prompt: req.body.prompt,
      answer: req.body.answer,
    });
    await answer.save();
    res.json({ data: answer, statusCode: 200 });
  } catch (err) {
    res.json({ data: err, statusCode: 500 });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server stated on port 5000 or ${process.env.PORT}`);
});
