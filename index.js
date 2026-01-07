const express = require("express");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
    res.status(400).json({ message: `${process.env.MESSAGE_DATA}${process.env.MESSAGE_SUFFIX}` });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});