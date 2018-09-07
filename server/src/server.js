const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
import {dataGetter} from "./App.js";


app.get('/api/hello', (req, res) => {
  dataGetter().then(data => res.send(data));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
