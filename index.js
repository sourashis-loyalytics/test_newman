import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});