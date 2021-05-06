const express = require('express');
const app = express()
const port = 3001
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

/*
app.get('/item_detail', (req, res) => {
    res.send('Hello world!');
    const q = req.body;
    console.log(q);
});
*/

app.post('/item_detail', (req, res) => {
    let sendData;
    const q = req.body.queryID;
    console.log(q);
    if(q === 1) {
        sendData = {
            album : "Lilac",
            singer : "IU",
            price : "14900",
            supply : "kakoEnt",
            category : "k-pop",
            detail: "detail text test"
        };
    }
    if(q === 2) {
        sendData = {
            album : "Lilaaaaaac",
            singer : "IU",
            price : "14900",
            supply : "kakoEnt",
            category : "k-pop",
            detail: "detail text test"
        };
    }
    res.send(sendData);
});

app.listen(port, () => {
    console.log(`Express listening at port : ${port}`);
});