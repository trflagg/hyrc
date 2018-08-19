const express = require('express');

const app = express()

app.get('/', (req, res) => {
  res.send('Hello world!');
});

let port = 3000
if (process.env.NODE_ENV === 'production') {
  port = 80;
}

if (!module.parent) app.listen(port, () => console.log(`listening on ${port}!`));

