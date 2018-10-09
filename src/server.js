const compression = require('compression');
const express = require('express');
const app = express();
app.use(compression());
const path = require('path');
const port = process.env.PORT || 5000;
import { predefinedDataGetter } from "./DataGetter";


app.get('/api/weather/:region', (req, res) => {
  predefinedDataGetter(req.params.region)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.log("error", error)
      res.send("error")
    });
});

//kept for later use
// app.get('/api/weather/:lonTopLeft,:latBottomLeft,:lonBottomRight,:latTopRight', (req, res) => {
//   dataGetter(req.params)
//     .then(data => res.send(data))
//     .catch(error => {
//       console.log("error", error)
//       res.send("error")
//     });
// });

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
