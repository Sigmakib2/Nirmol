const express = require('express');
const fs = require('fs');
const app = express();

// Read the list of bad words from the Nirmol JSON file
const word_list = JSON.parse(fs.readFileSync('nirmol.json', 'utf-8'));

// Read the prefixes and suffixes from the JSON file
const prefixesSuffixes = JSON.parse(fs.readFileSync('prefixes_suffixes.json', 'utf-8'));
const prefixes = prefixesSuffixes.prefixes;
const suffixes = prefixesSuffixes.suffixes;

function isBadWord(word) {

  word = word.toLowerCase();

  if (word_list.includes(word)) {
    return true;
  }

  for (const prefix of prefixes) {
    if (word.startsWith(prefix)) {
      return true;
    }
  }

  for (const suffix of suffixes) {
    if (word.endsWith(suffix)) {
      return true;
    }
  }

  return false;
}

app.get('/:sentence', (req, res) => {
  let sentence = req.params.sentence.toLowerCase();

  sentence = sentence.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '').replace(/।/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

  const words = sentence.split(' ');

  let badWordFound = [];
  let nonbadWordFound = [];

  for (const word of words) {
    if (isBadWord(word)) {
      badWordFound.push(word);
    } else {
      nonbadWordFound.push(word);
    }
  }

  const totalWords = words.length;
  const fruitRate = (badWordFound.length / totalWords) * 100;

  if (badWordFound.length > 0) {
    res.json({
      bad_sentence: true,
      bad_word_list: badWordFound,
      normal_words: nonbadWordFound,
      badness: `${fruitRate.toFixed(2)}%`
    });

  } else {
    res.json({
      bad_sentence: false,
      bad_word_list: badWordFound,
      normal_words: nonbadWordFound,
      badness: `0%`
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
