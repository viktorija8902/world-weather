const express = require('express');

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

app.listen(port, () => console.log(`Listening on port ${port}`));
