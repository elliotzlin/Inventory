const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  console.log('censor', censor(list))
  res.send(censor(list));
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/ocr', (req, res) => {
  console.log('body', req.body)
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`inventory is listening on port ${PORT}!`);
});
