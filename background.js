// background.js (Service Worker)

// This event listener is triggered when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    console.log("AI Assistant Extension Installed.");
});

// Listen for messages from other parts of the extension (e.g., popup.js, content.js)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getHint') {
        // Handle the 'getHint' action from popup.js or content.js
        console.log('Received message to get hint for:', message.problem);
        
        // Call an external AI service like OpenAI (this is just a placeholder)
        getAIHint(message.problem)
            .then(hint => {
                // Send the hint back to the sender (popup or content script)
                sendResponse({ hint });
            })
            .catch(error => {
                console.error("Error fetching AI hint:", error);
                sendResponse({ hint: 'Sorry, there was an error fetching the hint.' });
            });

        // Return true to indicate that we're using sendResponse asynchronously
        return true;
    }
});

// Function to call an AI service (e.g., OpenAI) for hints
async function getAIHint(problem) {
    // Replace this with your actual API URL and Key
    const API_URL = "https://api.openai.com/v1/completions";
    const API_KEY = "your-api-key-here"; // Use your own API key

    // Make a POST request to OpenAI's API to generate a hint based on the problem
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003", // Example model, use one that fits your needs
            prompt: `Provide a hint for solving the LeetCode problem: ${problem}`,
            max_tokens: 100, // Limit the length of the response
        }),
    });

    const data = await response.json();
    return data.choices[0].text.trim(); // Return the hint from the AI response
}
