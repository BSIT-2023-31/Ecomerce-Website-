const dotenv = require("dotenv");
// Load dotenv config immediately
dotenv.config();

const express = require("express");
const cookieparser = require("cookie-parser");
const expressSeton = require('express-session');
const connectFlash = require('connect-flash');

//routes
const ownerRoutes = require("./routes/ownerRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const indexpage =  require('./routes/index');

const app = express();
const path = require("path");
const db = require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(express.static(path.join(__dirname, "Public")));
app.set("view engine", "ejs");

app.use(expressSeton({
  resave: false,
  saveUninitialized:false,
  secret:"optiosn"
  
}));
app.use(connectFlash());

//Routes
app.use("/api/owner", ownerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use('/',indexpage);

app.listen(3000, function () {
  console.log("The server is started in http://locahost:3000");
});
