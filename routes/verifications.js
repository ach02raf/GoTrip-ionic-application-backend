var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const requireToken = require("../models/requireToken");

require("../models/user");
const user = mongoose.model("user");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
router.get("/sendsms", (req, res) => {
    const { phone } = req.headers;
    const random = Math.floor(Math.random() * 9000 + 1000);
    client.messages
        .create({
            body: "le code de vérification est =" + random,
            from: "+12076790308",
            to: "+21696673900",
        })
        .then((message) => console.log(message.sid));
    res.send({ random });
    console.log(random);
});
router.get("/verificationphone", async(req, res) => {
    const { phone } = req.headers;
    (await user.findOne({ phone })) ?
    res.send({ msg: true }): res.status(401).send({ msg: "this account does not exist" });
});
router
    .route("/:phone")
    .get((req, res) => {
        let token = jwt.sign({ userId: req.user._id }, process.env.ACCES_TOKEN_KEY);

        !req.err ?
            res.send({ token: `${token}` }) :
            res.status(401).send("phone not found");
    })
    .patch(requireToken, async(req, res) => {
        await user
            .findByIdAndUpdate({ _id: req.user._id }, {
                password: bcrypt.hashSync(
                    req.body.password,
                    Number(process.env.SALT)
                ),
            })
            .then((reselt) => res.send(true))
            .catch((err) => res.send(false));
    });
router.param("phone", async(req, res, next, phone) => {
    let add = await user.findOne({ phone }).catch((err) => (req.err = err));
    req.user = add;
    next();
});
module.exports = router;