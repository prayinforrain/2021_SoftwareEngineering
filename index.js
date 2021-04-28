var express = require('express')
var app = express()

app.set('view engine', 'ejs'); //1
app.use(express.static(__dirname + '/public'));


app.use(function (req, res, next) {
  let index = req.query.index
  var album = req.query.album
  var singer = req.query.singer
  let price = req.query.price
  var supply = req.query.supply
  var category = req.query.category
  var datail = req.query.datail

  output.push({
    album: i,
    price: 'name - ' + index.,
    category:,
    datail:
  })

  res.send(output)
})

app.listen(52273, function() {
  console.log('server at 127.0.0.1:52273')
})

/*
app.get('/hello', function(req, res) { //2
  res.render('hello', {name:req.query.nameQuery});
});

app.get('/hello/:nameParam', function(req, res) { //3
  res.render('hello', {name:req.params.nameParam});
});

var port = process.env.PORT || 3001;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});

module.exports = app;
*/
