let mongoose = require("mongoose");
const guideSchema = new mongoose.Schema({
    idUser: {
        type: String,
        required: true,
        unique: true,
    },
    ratingNumber: {
        type: String,
        required: true,
        default: "0",
    },
    listCategory: {
        type: [],
        required: true,
    },
    workArea: {
        type: [],
        required: true,
    },
    hourPrice: {
        type: Number,
        required: true,
    },
    dayPrice: {
        type: Number,
        required: true,
    },
    reservationType: {
        type: [Number],
        required: true,
        default: [],
    },
    ListOfbestplace: {
        type: [String],
        required: true,
    },
    galerie: {
        type: [String],
        required: true,
    },
    verifiedStatus: {
        type: [],
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
    },
});
guideSchema.pre("save", function(next) {
    next();
});

let collectionName = "guides";
mongoose.model("guide", guideSchema, collectionName);