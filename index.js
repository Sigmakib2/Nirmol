const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

// Specify allowed origin
const allowedOrigins = ['https://nirmol.pages.dev'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

//Enable CORS with specific origin
app.use(cors(corsOptions));

// Receive request as json
app.use(express.json());

// Read the list of bad words from the Nirmol JSON file
const word_list = new Set(JSON.parse(fs.readFileSync('nirmol.json', 'utf-8')));

// Read the prefixes and suffixes from the JSON file
const prefixesSuffixes = JSON.parse(fs.readFileSync('prefixes_suffixes.json', 'utf-8'));
const prefixes = prefixesSuffixes.prefixes;
const suffixes = prefixesSuffixes.suffixes;

function isBadWord(word) {

  word = word.toLowerCase();

  if (word_list.has(word)) {
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

const processResponse = (sentence, res) => {
  sentence = sentence.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '').replace(/।/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');

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
};

app.get("/*", (req, res) => {
  const rawPath = req.params[0];
  const cleaned = rawPath.toLowerCase().replace(/\//g, " "); // replace when found any / or others 
  processResponse(cleaned, res);
});

/*
POST REQUEST:
Request body format-
{
    "sentence": "your sentence here"
}
*/

app.post("/", (req, res) => {
  if (!req.body || !req.body.sentence) {
    return res.status(400).json({ error: "Missing 'sentence' in request body" });
  }
  const sentence = req.body.sentence.toLowerCase().replace(/\//g, " ");
  // const sentence = req.body.sentence.toLowerCase();
  processResponse(sentence, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
