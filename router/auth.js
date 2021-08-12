const express = require("express");
const mdata = require("../model/schema");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/////////////////registering user////////////
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "fill all the forms correctly" });
  }

  try {
    const data = await mdata.findOne({ email: email });

    if (data) {
      console.log("user registered already");
      return res.status(400).json({ error: "user already registered" });
    }
    const fdata = new mdata(req.body);
    console.log(fdata);
    await fdata.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.log(err);
  }
});

/////////////// sending users message from the contact us to mongodb /////////////////
router.post("/contactus", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(401).json({ error: "fill all details properly" });
    }

    const username = await mdata.findOne({ email: email });
    if (username) {
      await username.addmessage({ name, email, message });
      return res.status(201).json({ message: "message added sucessfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Missing email or password" });

    const query = await mdata.findOne({ email });

    if (query) {
      // verify if password matches or not
      let passwordMaches = await bcrypt.compare(password, query.password);
      if (passwordMaches) {
        let token = jwt.sign(
          { email, timestamp: Date.now() },
          process.env.JWT_SECRET
        );
        res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(400).json({ error: "Password does not match" });
      }
    } else {
      res.status(404).json({ error: "Could not find email." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
