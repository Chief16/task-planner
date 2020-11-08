const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongodb://localhost:27017/test
mongoose
    .connect("mongodb://localhost:27017/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully Connected to MongoDb");
    })
    .catch(e => {
        console.log("Error Faced while connecting to MongoDb");
        console.log(e);
    });

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

module.exports = {
    mongoose,
};
