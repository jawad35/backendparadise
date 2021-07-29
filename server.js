const express = require("express");
const app = express();
const path = require("path");
const nodemailer = require("./Email/Nodemailer");
var cors = require("cors");
require("dotenv").config();
const connectDB = require("./DB/Connection");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", require("./routes/userRoute"));
app.use("/api", require("./routes/registerUserRoute"));
app.use("/api", require("./routes/stripePayment"));
app.use("/api", require("./routes/blogRoute"));
// coupon routes
let Coupons = require("./routes/Coupan");
app.post("/api/coupancreate", Coupons.create);
app.get("/api/coupon_gets", Coupons.getAll);
app.post("/api/coupon_delete", Coupons.delete);
app.post("/api/coupanupdate", Coupons.update);

app.use(express.static("./build"));
// app.get('/', (req, res) => {
//     res.json("works now")
// })
app.get("*", (req, res) => {
  res.sendFile(path.dirname(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 4000;
app.listen(port, (req, res) => {
  console.log(`server running ${port}`);
});
