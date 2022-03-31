require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const multer = require("multer");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const app = express();

//mongoose.connect("mongodb://localhost/Friends-App")
mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log("Database connected!"))
   .catch(error => console.log(error))

// middlewares
app.use(express.json());
app.use(helmet());

app.use(cors({
	origin: "*"
}))

app.use(express.static("public"));

app.use(cors({
	origin: "*"
}))

// routes middleware
app.use("/",require("./routes/getRoute"))
app.use("/",require("./routes/postRoute"))
app.use("/",require("./routes/deleteRoute"))
app.use("/",require("./routes/updateRoute"))


app.listen(PORT,() => console.log("Server running on port ", PORT));
