//                                                                                           בס"ד

// requires
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const app = express();

// route requires
const userRoutes = require("./routes/userRoutes");
const buisnessRoutes = require("./routes/buisnessRoutes");

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3001', credentials: true}));


// database connection
const dbURI = "mongodb://127.0.0.1:27017/node-hackeru-project";
mongoose.set("strictQuery", false);
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(3000, () => {
      console.log("listening to port 3000 and connected to DB");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
app.use("/user", userRoutes);
app.use("/buisness-card", buisnessRoutes);
