var express = require("express");
var router = express.Router();
var User = require("../models").User;
var Destination = require("../models").Destination;

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.post("/signup", function (req, res, next) {
    console.log("in post req, /signup");
    console.log(User);
    User.findAll({
        where :{
            userID : req.body.id
        }
    }).then(result =>{
        console.log('signup id 조회')
        console.log(result);
    });
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

router.post("/add_destination", function (req, res, next) {
    console.log("in post req, /add_destination");
    console.log(Destination);
    Destination.create({
        postcode: req.body.postcode,
        roadAddress: req.body.roadAddress,
        jibunAddress1: req.body.jibunAddress1,
        jibunAddress2: req.body.jibunAddress2,
        extraAddress: req.body.extraAddress,
        addressOwner: req.body.addressOwner,
    }).then((result) => {
        console.log(result);
        res.status(201).json(result);
    }).catch((err) => {
        console.log("error while destination add");
        console.error(err);
        next(err);
    });
})

router.post('/destination', function(req, res, next) {
    console.log('in /destination POST req');
    console.log(req.body.id);
    Destination.findAll({
        where:{
            addressOwner:req.body.id
        }
    }).then(result=>{
        console.log(result);
        res.status(201).json(result);
    });
})

router.post('/login', function (req, res, next){
    console.log('in /login POST req');
    console.log(req.body.id);
    console.log(req.body.password);
    User.findAll({
        where:{
            userID:req.body.id,
            password:req.body.password
        }
    }).then(result=>{
        console.log(result);
        res.status(201).json(result);
    })
})

router.get("/test", function(req, res, next) {
    Destination.findAll({
        where :{
            addressOwner : 1
        }
    }).then(result => {
        console.log(result);
    });
    res.render("index", { title: "Test" });
})

module.exports = router;
