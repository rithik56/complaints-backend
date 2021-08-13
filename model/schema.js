const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  messages: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
});
//////////////////hashing a password/////////////////////
clientSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash("password", 10);
  }
  next();
});

/////////////////??...........adding code for adding message .........../////
clientSchema.methods.addmessage = async function (name, email, password) {
  try {
    this.messages = this.messages.concat({ name, email, password, message });
    await this.save();
    return this.messages;
  } catch (err) {
    console.log(err);
  }
};

const mdata = new mongoose.model("mdata", clientSchema);

module.exports = mdata;
