var express = require("express");
var router = express.Router();
const { default: mongoose } = require("mongoose");

require("../models/categorie");
const Categorie = mongoose.model("categorie");

router.post("/setCategorie", async (req, res) => {
  let { name, icon } = req.body;
  try {
    let categorie = new Categorie({
      name,
      icon,
    });
    await categorie.save();
    console.log("categorie posted");
    res.send(true);
  } catch (err) {
    console.log(err);
    console.log("categorie failed");
    res.status(401).send("categorie failed");
  }
});

router.get("/getAllcategorie", async (req, res) => {
  let categorie = await Categorie.find().catch(() =>
    res.status(401).send("get categorie failed")
  );
  res.send(categorie);
});

module.exports = router;
