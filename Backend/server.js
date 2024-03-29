import express from "express";
import cors from "cors";
import reviews from ".backend/api/reviews.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("backend/api/v1/reviews", reviews); //v1 not necessary here, but it's good practice to include in case the API has future versions.
app.use("*", (req, res) => {
  res.status(404).json({ error: "Not found." });
});

export default app;