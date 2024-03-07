    function toggleButton() {
      const inputText = document.getElementById('textInput').value.trim();
      const checkButton = document.getElementById('checkButton');
      checkButton.disabled = inputText === '';
    }

    function checkBadWords() {
      const inputText = document.getElementById('textInput').value;
      fetch(`https://nirmol.cyclic.app/${encodeURIComponent(inputText)}`)
        .then(response => response.json())
        .then(data => {
          const resultDiv = document.getElementById('result');
          resultDiv.innerHTML = '';

          if (data.bad_sentence) {
            resultDiv.innerHTML += '<div class="alert alert-danger" role="alert">This sentence contains bad words:</div>';
            resultDiv.innerHTML += `<p>Bad words: ${data.bad_word_list.join(', ')}</p>`;
            resultDiv.innerHTML += `<p>Normal words: ${data.normal_words.join(', ')}</p>`;
            resultDiv.innerHTML += `<p>Badness: ${data.badness}</p>`;
          } else {
            resultDiv.innerHTML = '<div class="alert alert-success" role="alert">No bad words found in the sentence.</div>';
          }
        })
        .catch(error => {
          console.error('Error:', error);
          document.getElementById('result').innerHTML = '<div class="alert alert-danger" role="alert">An error occurred. Please try again later.</div>';
        });
    }