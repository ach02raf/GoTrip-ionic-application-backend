let mongoose = require("mongoose");
const privatecCircuitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  totalplaceNumber: {
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
  imgGroup: {
    type: [String],
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  MembreReserver: {
    type: String,
    required: true,
  },
});
privatecCircuitSchema.pre("save", function (next) {
  next();
});
let collectionName = "privatecCircuits";
mongoose.model("privatecCircuit", privatecCircuitSchema, collectionName);
