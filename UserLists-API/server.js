const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Arcfej:ZjFkykzKvQYOIYAZ@user-lists-api.9s6xmz3.mongodb.net/MyFlixUserLists", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("User Lists DB Connected");
});

app.use("/api/user", userRoutes);

app.listen(5000, console.log("Server started on port 5000"));
