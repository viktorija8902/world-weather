const express = require('express');
const path = require('path')

const app = express();
const port = process.env.PORT || 5000;
import { dataGetter } from "./DataGetter.js";


app.get('/api/weather/:lonTopLeft,:latBottomLeft,:lonBottomRight,:latTopRight', (req, res) => {
  dataGetter(req.params)
    .then(data => res.send(data))
    .catch(error => {
      console.log("error", error)
      res.send("error")
    });
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
