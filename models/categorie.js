let mongoose = require("mongoose");
const categorieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
categorieSchema.pre("save", function (next) {
  next();
});
let collectionName = "categories";
mongoose.model("categorie", categorieSchema, collectionName);
