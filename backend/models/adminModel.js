const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const adminSchema = new mongoose.Schema(
    {
      role: { type: String, default: "admin" },
      email: { type: String, required: true, validate: [isEmail], lowercase: true, unique: true, trim: true, },
      password: { type: String, required: true, max: 1024, minlength: 5 },
    },
    {  timestamps: true, }
  );
  
  // play function before save into display: 'block',
  
  adminSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  adminSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect email");
  };
  
  const AdminModel = mongoose.model("user", adminSchema, "admins");
  
  module.exports = AdminModel;
  