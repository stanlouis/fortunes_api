const express = require('express');
const fortunes = require('./data/fortunes.json');
const app = express();

const port = 3000;

app.get('/fortunes', (req, res) => {
    res.json(fortunes);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));