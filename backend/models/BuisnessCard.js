//                                                                                           בס"ד

const mongoose = require("mongoose");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const buisnessCardSchema = new mongoose.Schema(
  {
    buisnessName: { type: String, required: true },
    buisnessSubtitle: {type: String, required: true},
    buisnessNumber: { type: Number, unique: true, required: true },
    buisnessDescription: { type: String, required: true },
    buisnessPhone: { type: String, required: true },
    buisnessEmail: {type:String,unique:true ,required:true},
    buisnessWebsite:{type:String},
    buisnessImage: { type: String },
    buisnessImageAlt: {type:String},
    address: {
      state: {type: String},
      street: { type: String, required: true },
      houseNumber: { type: String },
      city: { type: String, required: true },
      country: {type:String, required:true},
      zipCode: { type: String },
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

buisnessCardSchema.methods.buisnessCardValidation = function (obj) {
  const JOI = require("joi");
  const schema = JOI.object({
    buisnessName: JOI.string()
      .pattern(new RegExp("^[a-zA-Z0-9s][^|=]*$"))
      .min(2)
      .max(20)
      .required(),
    buisnessSubtitle: JOI.string().min(2).required(),
    buisnessDescription: JOI.string().min(10).required(),
    buisnessPhone: JOI.string()
      .pattern(
        new RegExp("^\\+?(972|0)(\\-)?0?(([23489]{1}\\d{7})|[5]{1}\\d{8})$")
      )
      .required(),
    buisnessEmail: JOI.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: true },
      })
      .required(),
    buisnessWebsite: JOI.string().empty(""),
    buisnessImage: JOI.string().empty(""),
    buisnessImageAlt: JOI.string().empty(""),
    address: {
      street: JOI.string()
        .pattern(new RegExp("^[a-zA-Z ]*$"))
        .min(2)
        .required(),
      houseNumber: JOI.string().pattern(
        new RegExp(
          "^[0-9\u0590-\u05FF\u200f\u200ea-zA-z]{0,3}[s]{0,1}[0-9\u0590-\u05FF\u200f\u200ea-zA-z]{0,2}$"
        )
      ),
      state: JOI.string()
        .pattern(new RegExp(/[a-zA-Z',.\s-]{2,}/))
        .empty(""),
      city: JOI.string().pattern(new RegExp("^[a-zA-Z ]*$")).required(),
      country: JOI.string().pattern(new RegExp(/[a-zA-Z ]{2,}/)),
      zipCode: JOI.string().alphanum().min(5),
    },
  });
    return schema.validate(obj);
  };

const BuisnessCard = mongoose.model(
  "Buisness-Card",
  buisnessCardSchema,
  "Buisness-Cards"
);

async function generateRandomNumber() {
  while (true) {
    let randomNumber = _.random(100000, 999999);
    let buisnessCard = await BuisnessCard.findOne({
      buisnessNumber: randomNumber,
    });
    if (!buisnessCard) {
      return Number(randomNumber);
    }
  }
}

const getUserId = (req) => {
  const token = req.cookies.jwt;
  const decoded = jwt.verify(
    token,
    "Moria ve Rom Hatotahim asu project node.js and Rachael take pictures of cats down the streets"
  );
  const id = decoded.id;
  return id;
};

module.exports = { BuisnessCard, generateRandomNumber, getUserId };
