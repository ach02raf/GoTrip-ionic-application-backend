var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

require("../models/guide");
const Guide = mongoose.model("guide");

let requireTokenGuide = require("../models/requireTokenGuide");
let requireTokenUserSwitch = require("../models/requireTokenUserSwitch");

router.post("/signup", async (req, res) => {
  let {
    idUser,
    listCategory,
    workArea,
    hourPrice,
    dayPrice,
    reservationType,
    ListOfbestplace,
    galerie,
    verifiedStatus,
    profilePicture,
  } = req.body;
  try {
    let guide = new Guide({
      idUser,
      listCategory,
      workArea,
      hourPrice,
      dayPrice,
      reservationType,
      ListOfbestplace,
      galerie,
      verifiedStatus,
      profilePicture,
    });
    await guide.save();
    let token = jwt.sign({ guideId: guide._id }, process.env.ACCES_TOKEN_KEY);
    res.send({ token });
    console.log("signup posted");
  } catch (err) {
    console.log(err);
    console.log("signup failed");
    res.status(401).send("signup failed");
  }
});

router.get("/signin", requireTokenUserSwitch, async (req, res) => {
  const { guide } = req;
  if (guide) {
    let token = jwt.sign({ guideId: guide._id }, process.env.ACCES_TOKEN_KEY);
    res.send({ token });
  } else {
    res.status(401).send("Password failed");
  }
});

router.get("/getAllGuide", async (req, res) => {
  let collectionGuide = Guide.find().catch((err) => res.status(401).send(err));
  collectionGuide.then((result) => res.send(result));
});
module.exports = router;
