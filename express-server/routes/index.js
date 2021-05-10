var express = require("express");
var router = express.Router();
var User = require("../models").User;

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.post("/signup", function (req, res, next) {
    console.log("in post req, /signup");
    console.log(User);
    User.create({
        name: req.body.username,
        userID: req.body.id,
        password: req.body.password,
        email: req.body.email,
        gender: req.body.sex,
        birth: req.body.birth,
        isAdult: req.body.adult,
    })
        .then((result) => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch((err) => {
            console.log("in signup error handler");
            console.error(err);
            next(err);
        });
});

module.exports = router;
