const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
require("dotenv").config();
const rateLimit = require("express-rate-limit");

const app = express();

app.set("trust proxy", process.env.numberOfProxies);

app.set("trust proxy", process.env.numberOfProxies);
app.get("/ip", (request, response) => response.send(request.ip));

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

app.get("/", (req, res) => {
  res.json({ data: "Hello World", statusCode: 200 });
});

app.get("/api/answers", async (req, res) => {
  try {
    const answers = await Answer.find({});
    const data = answers.sort((a, b) => b.createdAt - a.createdAt);
    res.json({ data: data, statusCode: 200 });
  } catch (err) {
    res.json({ data: err, statusCode: 500 });
  }
});

const apiLimiter = rateLimit({
  windowMs: 7 * 24 * 60 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per 7 days)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.post("/api/answers", apiLimiter, async (req, res) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-curie-001/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPEN_AI_API_KEY.replaceAll(
            ":",
            ""
          )}`,
        },
        body: JSON.stringify({
          prompt: `${req.body.prompt.slice(0, 500)}\n\nTl;dr`,
          temperature: 0.5,
          max_tokens: 64,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        }),
      }
    );
    const data = await response.json();
    const answer = new Answer({
      prompt: req.body.prompt,
      answer: data.choices[0].text,
    });
    await answer.save();
    const answers = await Answer.find({});
    const data2 = answers.sort((a, b) => b.createdAt - a.createdAt);
    res.json({ data: data2, statusCode: 200 });
  } catch (err) {
    res.json({ data: err, statusCode: 500 });
  }
});

app.listen(process.env.PORT || 5050, () => {
  console.log(`Server stated on port 5000 or ${process.env.PORT}`);
});
