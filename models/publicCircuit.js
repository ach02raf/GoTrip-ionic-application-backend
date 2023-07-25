let mongoose = require("mongoose");
const publiccCircuitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  placeNumber: {
    type: Number,
    required: true,
    default: 0,
  },
  dateCircuit: {
    type: String,
    required: true,
  },
  localization: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    default: null,
  },
  guideId: {
    type: String,
    required: true,
    default: null,
  },
  totalplaceNumber: {
    type: Number,
    required: true,
  },
  ListMembreReserver: {
    type: [],
    required: true,
  },
  imgGroup: {
    type: [String],
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
});
publiccCircuitSchema.pre("save", function (next) {
  next();
});
let collectionName = "publiccCircuits";
mongoose.model("publiccCircuit", publiccCircuitSchema, collectionName);
