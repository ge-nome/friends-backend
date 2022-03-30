require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const http = require("http");
const multer = require("multer");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const app = express();

// socket.io
const io = require("socket.io")(http,{
    cors: {
        origin: "*"
    }
});

// Image
// const storage = multer.diskStorage({
//     destination: async (req,file,cb) => {
//         cb(null,"public/images");
//     },
//     filename: async (req,file,cb) => {
//         cb(null, "iC"+"_"+Date.now()+path.extname(file.originalname))
//     }
// });
// 

// const upload = multer({ storage: storage});
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
// app.use('/images', express.static('images'));

app.use(cors({
	origin: "*"
}))

// routes middleware
app.use("/",require("./routes/getRoute"))
app.use("/",require("./routes/postRoute"))
app.use("/",require("./routes/deleteRoute"))
app.use("/",require("./routes/updateRoute"));
// chat and notification

io.on("connection",socket => {
	socket.emit("private","Hello chat");
});


app.listen(PORT,() => console.log("Server running on port ", PORT));