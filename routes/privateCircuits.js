var express = require("express");
var router = express.Router();
const { default: mongoose } = require("mongoose");

require("../models/privatecCircuit");
const PrivatecCircuit = mongoose.model("privatecCircuit");

router.post("/setPrivatecCircuit", async (req, res) => {
  let {
    name,
    dateCircuit,
    localization,
    guideId,
    totalplaceNumber,
    imgGroup,
    category,
    MembreReserver,
    Price,
  } = req.body;
  try {
    let circuit = new PrivatecCircuit({
      name,
      dateCircuit,
      localization,
      guideId,
      totalplaceNumber,
      imgGroup,
      category,
      MembreReserver,
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

router.get("/getPrivatecCircuit", async (req, res) => {
  const { name } = req.headers;
  let circuit = await PrivatecCircuit.findOne({ name }).catch(() =>
    res.status(401).send("circuit failed")
  );
  res.send(circuit);
});
router.get("/getAllPrivatecCircuit", async (req, res) => {
  let circuit = await PrivatecCircuit.find().catch(() =>
    res.status(401).send("circuit failed")
  );
  res.send(circuit);
});

// router
//   .route("/:id")
//   .get(requireTokenGuide, (req, res) => {
//     !req.err ? res.send(req.user) : res.status(401).send(req.err);
//   })
//   .patch(requireTokenGuide, async (req, res) => {
//     const { recommended } = req.body;
//     await user
//       .findByIdAndUpdate(
//         { _id: req.user._id },
//         {
//           recommended: recommended,
//         }
//       )
//       .then((reselt) => res.send(true))
//       .catch((err) => res.status(401).send(err));
//   });
// router.param("id", async (req, res, next, _id) => {
//   let add = await user.findById({ _id }).catch((err) => (req.err = err));
//   req.user = add;
//   next();
// });

module.exports = router;
