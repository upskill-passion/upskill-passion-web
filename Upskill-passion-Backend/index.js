const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const cors = require('cors');
// Enable CORS for all routes
app.use(cors());

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Hi HOmepage");
})

app.use(require('./routes/views'));
app.use(require('./routes/createQuery'));
app.use(require('./routes/giveAnswer'));
app.use(require('./routes/reply'));
app.use(require('./routes/blogpost'));
app.use(require('./routes/searchQuery'));
app.use(require('./routes/registerUser'));
app.use(require('./routes/jobs'));
app.use(require('./routes/useractions'))
app.listen(port, () => {
  console.log(`server started at ${port}`);
})