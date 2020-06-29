const express = require("express");
const Skills = require("../model/skills.model");

const router = express.Router();

router.get("", (req, res, next) => {
    Skills.find()
    .then(result => {
        res.status(200).json({
            skills: result,
            message: "success"
        });
    });
});

module.exports = router;