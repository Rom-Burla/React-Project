//                                                                                           בס"ד

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fName: { type: String, required: true },
    mName: {type: String},
    lName: {type: String, required: true},
    phone: {type: String, required: true},
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    imageUrl: {type: String},
    imageAlt: {type: String},
    state: {type: String},
    country: {type: String, required: true},
    city: {type: String, required: true},
    street: {type: String, required: true},
    houseNumber: {type: String, required: true},
    zip: {type: String, required: true},
    biz: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Buisness-Card" }],
  },
  { timestamps: true }
);

// user vaidations method
userSchema.methods.userValidation = function (obj) {
  const JOI = require("joi");
  const schema = JOI.object({
    fName: JOI.string().alphanum().required().min(2).max(12),
    mName: JOI.string().alphanum().max(12).empty(''),
    lName: JOI.string().alphanum().required().min(2).max(12),
    phone: JOI.string()
      .pattern(/^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
      .required(),
    email: JOI.string().email({
      minDomainSegments: 2,
      tlds: { allow: true },
    }).required(),
    password: JOI.string().pattern(new RegExp(/^[a-zA-Z0-9]{8,30}$/)),
    imageUrl: JOI.string().pattern(
      new RegExp(/[/.](gif|jpg|jpeg|tiff|png|webp)$/i)
    ).empty(''),
    imageAlt: JOI.string().empty(''),
    state: JOI.string().pattern(new RegExp(/[a-zA-Z',.\s-]{2,}/)).empty(''),
    country: JOI.string()
      .pattern(new RegExp(/[a-zA-Z ]{2,}/))
      .required(),
    city: JOI.string()
      .pattern(new RegExp(/[a-zA-Z',.\s-]{2,}/))
      .required(),
    street: JOI.string()
      .pattern(new RegExp(/[a-zA-Z',.\s-]{2,}/))
      .required(),
    houseNumber: JOI.string()
      .alphanum()
      .pattern(new RegExp(/^[1-9]\d*(?: ?(?:[a-zA-Z]|[/-] ?\d+[a-zA-Z]?))?$/))
      .required(),
    zip: JOI.string()
      .pattern(new RegExp(/^\d{5}(?:[-\s]\d{4})?$/))
      .required(),
    biz: JOI.boolean().default(false)
  });
  return schema.validate(obj);
};

// encrypt password with bcrypt pre save
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.post("save", async function (doc, next) {
  console.log(`new user has been signed up \n ${doc}`);
  next();
});

// login static method
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error("Incorrect password");
    }
  } else {
    throw Error("Incorrect Email");
  }
};

const User = mongoose.model("User", userSchema, "Users");

module.exports = User;
