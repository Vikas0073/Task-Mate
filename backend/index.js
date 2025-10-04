const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const conn = require("./connection"); // MongoDB connection
const worker = require("./schema");    // Worker schema
const card = require("./card");        // Card schema
const register = require("./register"); // User schema

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads"))); // serve uploaded images

// ======= Multer setup =======
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});
const upload = multer({ storage });

// ======= Worker Routes =======

// POST new worker with image
app.post("/worker", upload.single("image"), async (req, res) => {
  try {
    const data = new worker({
      name: req.body.name,
      skills: req.body.skills,
      mobile: req.body.mobile,
      email: req.body.email,
      availability: req.body.availability,
      experience: req.body.experience,
      address: req.body.address,
      image: req.file ? `http://localhost:4000/uploads/${req.file.filename}` : "",
    });
    await data.save();
    res.json({ message: "Worker added successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save worker", details: err.message });
  }
});

// PUT update worker (with optional image)
app.put("/worker/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedData = {
      name: req.body.name,
      skills: req.body.skills,
      mobile: req.body.mobile,
      email: req.body.email,
      availability: req.body.availability,
      experience: req.body.experience,
      address: req.body.address,
      image: req.file ? `http://localhost:4000/uploads/${req.file.filename}` : req.body.image || "",
    };
    const updatedWorker = await worker.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json({ message: "Worker updated successfully", data: updatedWorker });
  } catch (err) {
    res.status(500).json({ error: "Failed to update worker", details: err.message });
  }
});

// GET all workers
app.get("/worker", async (req, res) => {
  try {
    const data = await worker.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch workers" });
  }
});

// GET worker by ID
app.get("/worker/:id", async (req, res) => {
  try {
    const data = await worker.findById(req.params.id);
    if (!data) return res.status(404).json({ error: "Worker not found" });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: "Invalid Worker ID" });
  }
});

// DELETE worker
app.delete("/worker/:id", async (req, res) => {
  try {
    await worker.deleteOne({ _id: req.params.id });
    res.json({ message: "Worker deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete worker" });
  }
});

// ======= User Routes =======

// Register (no image)
app.post("/user/register", async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.pass, 10);
    const data = new register({
      name: req.body.name,
      pass: hashedPass,
      email: req.body.email,
      mobile: req.body.mobile,
    });
    await data.save();
    res.json({ message: "User registered successfully", data });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user", details: err.message });
  }
});

// Login
app.post("/user/login", async (req, res) => {
  try {
    const user = await register.findOne({ name: req.body.name });
    if (!user) return res.status(404).json({ error: "User does not exist" });

    const cmp = await bcrypt.compare(req.body.pass, user.pass);
    if (!cmp) return res.status(401).json({ error: "Wrong password" });

    res.json({ message: "User login successful", data: user });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

// ======= Card Routes (no change) =======

// POST new card
app.post("/wrk/card", async (req, res) => {
  try {
    const data = new card({
      name: req.body.name,
      skills: req.body.skills,
      mobile: req.body.mobile,
      email: req.body.email,
      availability: req.body.availability,
      experience: req.body.experience,
      address: req.body.address,
      image: req.body.image || "",
    });
    await data.save();
    res.json({ message: "Card saved successfully", data });
  } catch (err) {
    res.status(500).json({ error: "Failed to save card", details: err.message });
  }
});

// GET all cards
app.get("/wrk/card", async (req, res) => {
  try {
    const data = await card.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cards" });
  }
});

// DELETE card
app.delete("/wrk/card/:id", async (req, res) => {
  try {
    await card.deleteOne({ _id: req.params.id });
    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete card" });
  }
});

// ======= Start server =======
app.listen(4000, () => console.log("Server running on http://localhost:4000"));
