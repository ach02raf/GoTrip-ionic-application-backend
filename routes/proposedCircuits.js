var express = require("express");
var router = express.Router();
const { default: mongoose } = require("mongoose");
require("../models/proposedCircuit");
const ProposedCircuit = mongoose.model("proposedCircuit");
let requireTokenUserSwitch = require("../models/requireTokenUserSwitch");
router.post("/setProposedCircuit", async (req, res) => {
  let {
    name,
    dateCircuit,
    localization,
    guideIdProposed,
    imgGroup,
    category,
    typeCircuit,
    idUser,
    totalplaceNumber,
  } = req.body;
  try {
    let circuit = new ProposedCircuit({
      name,
      dateCircuit,
      localization,
      guideIdProposed,
      imgGroup,
      category,
      typeCircuit,
      idUser,
      totalplaceNumber,
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

router.get("/getProposedCircuit", async (req, res) => {
  const { name } = req.headers;
  let circuit = await ProposedCircuit.findOne({ name }).catch(() =>
    res.status(401).send("circuit failed")
  );
  res.send(circuit);
});

router.get(
  "/getAllProposedCircuit",
  requireTokenUserSwitch,
  async (req, res) => {
    id = req.guide._id.toString();
    let circuit = await ProposedCircuit.find({
      guideIdProposed: { $elemMatch: { _id: id } },
    }).catch(() => res.status(401).send("circuit failed"));
    res.send(circuit);
  }
);

router.patch("/updateTripStatus", async (req, res) => {
  const trip = req.body;
  await ProposedCircuit.findByIdAndUpdate(
    { _id: trip._id },
    {
      guideIdProposed: trip.guideIdProposed,
    }
  )
    .then((reselt) => res.send(true))
    .catch((err) => res.status(401).send(err));
});
router.patch("/updateTripStatuspricipale", async (req, res) => {
  const trip = req.body;
  await ProposedCircuit.findByIdAndUpdate(
    { _id: trip._id },
    {
      etat: trip.etat,
    }
  )
    .then((reselt) => res.send(true))
    .catch((err) => res.status(401).send(err));
});
module.exports = router;
