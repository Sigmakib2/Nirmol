# Nirmol

**Nirmol (নির্মল) is a Microservice-based offensive language detection API. Detect offensive/bad/slang words in Bangla/Bengali/Banglish sentences. You can set up or host your API on any node js server.Nirmol: Keeping Bangla Online Conversations Clean and Respectfu**

![](nirmol.png)

**📑Documentation:** [Nirmol Doc](https://nirmol.pages.dev/https:/)

📹**Project overview:** [YouTube](https://youtu.be/6wfPOn2xqno?si=JLfBxcusG7BBMIdW)

## Installation

You can download the dataset from the GitHub repository but here is the [Direct dataset link ](https://github.com/Sigmakib2/Nirmol/tree/main/datasets). You can download and use this dataset for ML and AI model training.

Nirmol API is based on:

1. Node.js
2. Express.js

npm package used

1. body-parser
2. cors
3. fs
4. nodemon

### Run Nirmol locally

**Step 1:** Clone the Nirmol repository

```
git clone https://github.com/Sigmakib2/Nirmol.git
```

**Step 2:** Go to the Nirmol directory

```
cd Nirmol
```

**Step 3:** Install node modules

```
npm install
```

**Step 4:** Start the project

```
npm start
```

Then, open your web browser and navigate to http://localhost:3000, and you should see "Cannot GET /" displayed on the page. To test the api you have to enter something after the '/'. For example **"http://localhost:3000/hello world"**

## API Response

The API endpoint analyzes a sentence for offensive/slang words and provides additional information about the sentence.

For example here is a get request and response:


```
{
  "bad_sentence": true,
  "bad_word_list": [
    "word 1", "word 2"
  ],
  "normal_words": [
    "word 1",
    "word 2",
    "word 3"
  ],
  "badness": "16.67%"
}
```

You can also use the POST method to get response. This feature was added by [Tasnim Anas](https://github.com/TasnimAnas).

For POST request: the endpoint is `"http://localhost:3000/"` and you have to send payload in the body like this:

```
{
  "sentence": "Your sentence here..."
}
```


Here's what the response means:

1. **bad_sentence:** Indicates whether the sentence contains any offensive/bad/slang words or not. This only returns boolean values.
2. **bad_word_list:** Lists the offensive/bad/slang words found in the sentence.
3. **normal_words:** Lists the words in the sentence that are considered normal or not offensive/bad/slang words.
4. **badness:** Indicates the proportion of offensive/bad/slang words in the sentence.

### Features

This can ignore special symbols like # ! @ etc. Many people on the internet use these types of special symbols within slang words and AI systems cannot detect this most of the time. For example, Hello World can be written like this "He#ll@ W@rl#d" which is so difficult for many AI systems to detect. Here we used a simple approach! When there are special symbols in a word our API ignores them and then checks that word.


This API also ignores emojis🥳


There are some words in Bangla that work as prefixes or suffixes and make other worlds toxic. You can include the `prefixes_suffixes.json` file. This API finds those words in a sentence with any word as prefixes or suffixes and declares that whole word as a negative word.

### Limitations

you cannot put any "/" symbol in the given sentence (when you are using GET method). For example, you have a text area where someone writes "Hello world/earth" and you are testing the input value without any validation or sanitization. If you do this then you will face problems like this: "Cannot GET /hello%20world/earth". So you can use the POST method for this.

## Update Words (Dataset)

Suppose you have your list of offensive/bad/slang words. You want to add them to your API. Then how can you do that? Here in this repository, you can find the solution. After cloning the project you will see 3 files: input.txt, nirmol.json, and txt-2-nirmol.js.

Suppose you have your list of offensive/bad/slang words. You want to add them to your API. Then how can you do that? Here in this repository, you can find the solution. After cloning the project you will see 3 files: input.txt, nirmol.json, and txt-2-nirmol.js.

```

              .gitignore
              index.js
        🟡->  input.txt
        🟢->  nirmol.json
              nirmol.png
              package-lock.json
              package.json
              prefixes_suffixes.json
              README.md
              tree.txt
        🔴 -> txt-2-nirmol.js
              +---datasets
              |       Nirmol-v1-dataset.csv
              |   
              \---node_modules
  
```

Here the input.txt file contains all the offensive/bad/slang words available in the dataset. The nirmol.json contains the same data structurally, and the txt-2-nirmol.js is the script that converts the input.txt into the nirmol.json file

### Updating JSON List from Text File

1. Edit the Text File:
   * Locate the text file:`input.txt`
   * Open the text file using a text editor of your choice.
2. Update the Data in the Text File:

* Modify the content of the text file according to your requirements.
* Add, remove, or edit the lines in the text file as needed.

1. Save Changes:

* Save the changes made to the text file.

1. Run the Node.js Script:

* Ensure that you have the Node.js script available for updating the JSON list.
* Open your terminal or command prompt.
* Navigate to the directory containing the Node.js script.

1. Execute the Node.js Script:

* Run the Node.js script by executing the following command:

```
node txt-2-nirmol.js
```

1. Verify Output:

* Once the script execution is complete, verify that the JSON list has been updated correctly.
* Check the contents of the output JSON file (`nirmol.json` ) to ensure that it reflects the changes made to the text file.

## Source & Credits

#### Dataset

* Bengali-Hate-Speech-Dataset-[https://github.com/rezacsedu/Bengali-Hate-Speech-Dataset](https://github.com/rezacsedu/Bengali-Hate-Speech-Dataset)
* BNLexicon-[https://github.com/sazzadcsedu/BNLexicon](https://github.com/sazzadcsedu/BNLexicon)
* BAAD: A Multipurpose Dataset for Automatic Bangla Offensive Speech Recognition-[https://data.mendeley.com/datasets/w24g8xn23c/3](https://data.mendeley.com/datasets/w24g8xn23c/3)

#### Technology

* Node.js -[https://nodejs.org/](https://nodejs.org/)
* Express.js -[https://expressjs.com/](https://expressjs.com/)

#### Documentation Template

* iDocs -[https://github.com/harnishdesign/iDocs](https://github.com/harnishdesign/iDocs)
