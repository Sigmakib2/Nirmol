const express = require('express');
const fs = require('fs');
const app = express();

const badwordlist = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

app.get('/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const isInList = badwordlist.includes(name);
  if (isInList) {
    res.json({ word: `${name}`, is_badword: true});
  } else {
    res.json({ word: `${name}`, is_badword: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});