const express = require("express");

const skillsRouter = require("./backend/routes/skills");
const mongoose = require("mongoose");

app = express();

mongoose.connect("mongodb+srv://techN0:6kcjGXy3M3B9DZXl@cluster0-gkkfj.mongodb.net/<dbname>?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected to database");
})
.catch(err => {
    console.log("Cannot connect to database");
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Origin, X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, PATCH, OPTIONS");
    next();
})

app.use("/api/save", skillsRouter);

module.exports = app;