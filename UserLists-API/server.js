const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/MyFlix", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("User Lists DB Connected");
});

app.use("/api/user", userRoutes);

app.listen(5000, console.log("Server started on port 5000"));
