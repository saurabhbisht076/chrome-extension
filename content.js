// content.js (injects a floating hint box into the page)

const bubble = document.createElement('div');
bubble.style.position = 'fixed';
bubble.style.right = '10px';
bubble.style.bottom = '10px';
bubble.style.padding = '10px';
bubble.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
bubble.style.border = '1px solid #ccc';
bubble.style.borderRadius = '5px';
bubble.style.zIndex = '9999';
bubble.innerText = 'AI: Consider using a hash map.';

document.body.appendChild(bubble);
