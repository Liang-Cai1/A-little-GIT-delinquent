import express from "express";
import fs from "fs";
const router = express.Router();

router.get("/", (req, res) => {
  try {
    // Check if file exists first
    if (fs.existsSync("queries.json")) {
      const data = fs.readFileSync("queries.json", "utf8");
      res.status(200).json(JSON.parse(data));
    } else {
      // Return empty array if file doesn't exist
      res.status(200).json([]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error reading queries file" });
  }
});

router.post("/", (req, res) => {
  const queryArray = req.body;
  const data = JSON.stringify(queryArray, null, 2);
  try {
    fs.writeFileSync("queries.json", data);
    console.log("query array saved to queries.json");
    res.status(200).json({ message: "query array saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
