const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const fortunes = require('./data/fortunes.json');

const app = express();
app.use(bodyParser.json());

app.get('/fortunes', (req, res) => {
    res.json(fortunes);
});

app.get('/fortunes/random', (req, res) => {
    res.json(fortunes[Math.floor(Math.random() * fortunes.length)]);
});

app.get('/fortunes/:id', (req, res) => {
    console.log(req.params);
    res.json(fortunes.find(f => f.id == req.params.id));
});

const writeFortunes = jsonFortunes => {
    fs.writeFile('./data/fortunes.json', JSON.stringify(jsonFortunes), (err) => {
        console.log(err);
    });
}

app.post('/fortunes', (req, res) => {
    const {
        message,
        lucky_number,
        spirit_animal
    } = req.body;

    const fortunes_ids = fortunes.map(f => f.id);

    const new_fortunes = fortunes.concat({
        id: (fortunes_ids.length > 0 ? Math.max(...fortunes_ids) : 0) + 1,
        message,
        lucky_number,
        spirit_animal
    });
    
    writeFortunes(new_fortunes);

    res.json(new_fortunes);
});

app.put('/fortunes/:id', (req, res) => {
    const { id } = req.params;

    const old_fortune = fortunes.find(f => f.id == id);

    ['message', 'lucky_number', 'spirit_animal'].forEach(key => {
        if (req.body[key]) old_fortune[key] = req.body[key];
    });

    writeFortunes(fortunes);

    res.json(fortunes);
});

module.exports = app;