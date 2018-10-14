const express = require('express');
const app = express();
const PORT = 3000;
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const unirest = require('unirest');
const path = require('path');
const cors = require('cors');
app.use(cors())
app.use('/assets', express.static('assets'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/location', (req, res) => {
  let location = req.query.location;
  let myresult = unirest.get(`https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=${location}`)
    .header("X-Mashape-Key", "IEubOX8EKmmsh5S6UOuW6STkyXiOp14O0XGjsnnbus2zP2PueI")
    .header("Accept", "application/json")
    .end(function (result) {
      res.json(result.body.Results);
      console.log(result.body.Results);
    });
});

app.get('/route', (req, res) => {
  let location1 = req.query.from;
  let location2 = req.query.to;

  let bothResults = [];
  unirest.get(`https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=${location1}`)
    .header("X-Mashape-Key", "IEubOX8EKmmsh5S6UOuW6STkyXiOp14O0XGjsnnbus2zP2PueI")
    .header("Accept", "application/json")
    .end(function (result) {
      bothResults[0] = result.body.Results;
      let secondResult = unirest.get(`https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=${location2}`)
        .header("X-Mashape-Key", "IEubOX8EKmmsh5S6UOuW6STkyXiOp14O0XGjsnnbus2zP2PueI")
        .header("Accept", "application/json")
        .end(function (result) {
          bothResults[1] = result.body.Results;
          res.json(bothResults);
        });
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => {
  console.log(`listening on ${port}`);
})