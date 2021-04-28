var http = require('http')
var express = require('express')
var bodyParser = require('body-Parser')
var app = express()
const port = 3001

app.set('views engine', 'ejs')
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Routes
// Home
app.get('/' function(req, res) {
  res.redirect('/contacts')
})

// Contacts - Index
app.get('/contacts', function(req, res) {
  Cintact.find({}, function(err, cintacts) {
    if (err) return res.json(err);
    res.render('contacts/index', {contacts:contacts})
  })
})

// Contacts - New
app.get('/contacts/new', function(req, res) {
  res.render('contacts/new')
})

app.post('/contacts', function(req, res) {
  Contact.create(req.body, function(err, contact) {
    if (err) return res.json(err);
    res.redirect('/contacts')
  })
})

app.listen(port, function() {
  console.log((`Server port - ${port}`)
})
