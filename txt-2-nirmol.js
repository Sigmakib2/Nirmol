const fs = require('fs');

// Read the text file
fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error found when reading input.txt file:', err);
    return;
  }

  // Split the data by lines and remove carriage return characters
  const lines = data.trim().split('\n').map(line => line.replace(/\r$/, ''));

  // Create JSON object
  const jsonObject = JSON.stringify(lines);

  // Write the JSON object to a file
  fs.writeFile('nirmol.json', jsonObject, 'utf8', (err) => {
    if (err) {
      console.error('Error creating nirmol.json file:', err);
      return;
    }
    console.log('Your nirmol.json file has been created successfully!');
  });
});
