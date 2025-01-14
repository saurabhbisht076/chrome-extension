// popup.js (sending a message to background.js)

document.getElementById('askButton').addEventListener('click', async () => {
    const question = document.getElementById('questionInput').value;
    const responseContainer = document.getElementById('responseContainer');
    
    // Clear previous responses and show loading message
    responseContainer.innerHTML = 'Loading...';

    // Send a message to the background.js to get the AI hint
    chrome.runtime.sendMessage(
        { action: 'getHint', problem: question },
        (response) => {
            if (response && response.hint) {
                // Display the hint returned from background.js
                responseContainer.innerHTML = response.hint;
            } else {
                responseContainer.innerHTML = 'No hint found.';
            }
        }
    );
});
