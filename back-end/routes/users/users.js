import express from "express";
import { client, connect } from "./db.js";
const dbName = "usersdb";
const collectionName = "users";
connect();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const prj = { user: 1, email: 1, _id: 0 };
    const users = await collection.find({}).project(prj).toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/authenticate", async (req, res) => {
  try {
    console.log("=== AUTHENTICATION DEBUG ===");
    console.log("Request body:", req.body);
    console.log("Looking for user:", req.body.user);

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.findOne({ user: req.body.user });

    console.log("Database result:", result);

    if (result) {
      console.log(`Found user: ${result.user}, comparing passwords`);

      console.log(
        `Password comparison: DB="${
          result.password
        }" (${typeof result.password}) vs REQ="${
          req.body.password
        }" (${typeof req.body.password})`
      );
      console.log(`Are they equal? ${result.password === req.body.password}`);

      if (result.password === req.body.password) {
        console.log("✅ Authentication SUCCESS");
        res.status(200).json({ message: "user passed authentication!" });
      } else {
        console.log("❌ Authentication FAILED - password mismatch");
        res.status(401).json({ error: "unauthorized: bad password" });
      }
    } else {
      console.log("❌ Authentication FAILED - user not found");
      res.status(401).json({ error: "unauthorized: user not found" });
    }
  } catch (err) {
    console.log("Authentication error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

export default router;
