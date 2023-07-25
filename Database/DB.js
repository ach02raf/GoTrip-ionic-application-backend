const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect(
            process.env.DATA_BASE_URL, {
                useUnifiedTopology: true,
            }
        );

        console.log("Database connection success");
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;