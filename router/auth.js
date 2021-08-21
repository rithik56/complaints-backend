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
    const { name, email, issue } = req.body;
    if (!name || !email || !issue) {
      return res
        .status(201)
        .json({ message: "your message has been stored once" });
    }

    const username = await usdata.findOne({ email: email });

    if (!username) {
      const userdata = new usdata(req.body);
      console.log(userdata);
      await userdata.save();
      res.status(201).send("your message has been stored once");
    }
    if (username) {
      console.log(
        "ur message has been sent once and message can be sent once only"
      );

      res
        .status(400)
        .send(
          "ur message has been sent once and message can be sent once only"
        );
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
