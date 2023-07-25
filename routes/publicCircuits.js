var express = require("express");
var router = express.Router();
const { default: mongoose } = require("mongoose");

require("../models/publicCircuit");
const PubliccCircuit = mongoose.model("publiccCircuit");

router.post("/setPubliccCircuit", async (req, res) => {
  let {
    name,
    dateCircuit,
    localization,
    guideId,
    totalplaceNumber,
    imgGroup,
    category,
    ListMembreReserver,
    Price,
  } = req.body;
  try {
    let circuit = new PubliccCircuit({
      name,
      dateCircuit,
      localization,
      guideId,
      totalplaceNumber,
      imgGroup,
      category,
      ListMembreReserver,
      Price,
    });
    await circuit.save();

    res.send(circuit);
    console.log("circuit posted");
  } catch (err) {
    console.log(err);
    console.log("circuit failed");
    res.status(401).send("circuit failed");
  }
});

router.get("/getPubliccCircuit", async (req, res) => {
  const { name } = req.headers;
  let circuit = await PubliccCircuit.findOne({ name }).catch(() =>
    res.status(401).send("circuit failed")
  );
  res.send(circuit);
});
router.get("/getAllPubliccCircuit", async (req, res) => {
  let circuit = await PubliccCircuit.find().catch(() =>
    res.status(401).send("circuit failed")
  );
  res.send(circuit);
});
module.exports = router;
