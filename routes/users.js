var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

require("../models/user");
const user = mongoose.model("user");

let requireToken = require("../models/requireToken");
/* GET users listing. */

router.post("/signup", async (req, res) => {
  let { password, username, email, phone, sexe } = req.body;
  try {
    let User = new user({ password, username, email, phone, sexe });
    await User.save();
    let token = jwt.sign({ userId: User._id }, process.env.ACCES_TOKEN_KEY);
    res.send({ token });
    console.log("signup posted");
  } catch (err) {
    console.log(err);
    console.log("signup failed");
    res.status(401).send("signup failed");
  }
});
router.get("/getAllNameUser", async (req, res) => {
  let listeName = [];
  let listUsers = await user.find().catch((err) => res.status(401).send(err));
  listUsers.forEach((element) => {
    listeName.push({ _id: element._id, username: element.username });
  });
  res.send(listeName);
});
router.get("/signin", async (req, res) => {
  const { username, password } = req.headers;
  let User = await user.findOne({ username });
  User
    ? User.comparePassword(password)
        .then(() => {
          let token = jwt.sign(
            { userId: User._id },
            process.env.ACCES_TOKEN_KEY
          );
          res.send({ token });
        })
        .catch(() => res.status(401).send("Password failed"))
    : res.status(401).send("User not found");
});

router.patch("/updateGuidePass", requireToken, async (req, res) => {
  const { guide } = req.body;
  await user
    .findByIdAndUpdate(
      { _id: req.user._id },
      {
        guide: guide,
      }
    )
    .then((reselt) => res.send(true))
    .catch((err) => res.status(401).send(err));
});
router
  .route("/:id")
  .get(requireToken, (req, res) => {
    !req.err ? res.send(req.user) : res.status(401).send(req.err);
  })
  .patch(requireToken, async (req, res) => {
    const { recommended } = req.body;
    await user
      .findByIdAndUpdate(
        { _id: req.user._id },
        {
          recommended: recommended,
        }
      )
      .then((reselt) => res.send(true))
      .catch((err) => res.status(401).send(err));
  });
router.param("id", async (req, res, next, _id) => {
  let add = await user.findById({ _id }).catch((err) => (req.err = err));
  req.user = add;
  next();
});
module.exports = router;
