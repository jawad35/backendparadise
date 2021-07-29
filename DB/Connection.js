const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose
      .connect(
        process.env.MONGODB_URL ||
          "mongodb+srv://admin:admin@carparking.vtric.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          createIndexes: false,
        }
      )
      .then((res) =>
        console.log(`Database connected succesfully on ${res.connection.host}`)
      );
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = connectDB;
