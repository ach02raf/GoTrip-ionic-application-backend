let jwt = require("jsonwebtoken");
let mongoose = require("mongoose");
let Guide = mongoose.model("guide");

module.exports = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "failed access" });
  }
  let token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.ACCES_TOKEN_KEY, async (err, payload) => {
    if (err) {
      res.status(401).send({ error: "erreur" });
    } else {
      let { userId } = payload;
      let guide = await Guide.findOne({ idUser: userId });
      req.guide = guide;
      next();
    }
  });
};
