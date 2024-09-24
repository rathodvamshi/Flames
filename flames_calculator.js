document.getElementById('flamesForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const flamesName1 = document.getElementById('flamesName1').value;
    const flamesName2 = document.getElementById('flamesName2').value;

    // Calculate the flames result and handle display
    const flamesResult = calculateAndDisplayFlames(flamesName1, flamesName2);

    // Store data in Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbwp9pvYlUbSSuhensJVEwp_RP7FocPCJHBHcXWzAA9y3KaJ9r6Y7GBvqKLTwszqE8ch/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ Name_1: flamesName1, Name_2: flamesName2, Flames_Result: flamesResult }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
});

// Merged function to calculate and display FLAMES result
function calculateAndDisplayFlames(name1, name2) {
    const flamesOptions = ['Friend', 'Love', 'Affection', 'Marriage', 'Enemy', 'Siblings'];
    const combinedLength = name1.length + name2.length;
    const flamesResult = flamesOptions[combinedLength % flamesOptions.length];

    // Display the result
    const resultElement = document.querySelector('.result');
    resultElement.textContent = `Your FLAMES result: ${flamesResult}`;
    resultElement.classList.add('show');

    // Determine the GIF based on the result
    const gifContainer = document.getElementById('gifContainer');
    gifContainer.innerHTML = ""; // Clear previous GIFs

    let gifSource = "";
    switch (flamesResult) {
        case 'Friend':
            gifSource = 'path/to/friend.gif'; // Change this to your friend's GIF URL
            break;
        case 'Love':
            gifSource = 'path/to/love.gif'; // Change this to your love GIF URL
            break;
        case 'Affection':
            gifSource = 'path/to/affection.gif'; // Change this to your affection GIF URL
            break;
        case 'Marriage':
            gifSource = 'path/to/marriage.gif'; // Change this to your marriage GIF URL
            break;
        case 'Enemy':
            gifSource = 'path/to/enemy.gif'; // Change this to your enemy GIF URL
            break;
        case 'Siblings':
            gifSource = 'path/to/siblings.gif'; // Change this to your siblings GIF URL
            break;
        default:
            gifSource = 'path/to/default.gif'; // Default GIF if no result matches
    }

    // Create and append the GIF
    if (gifSource) {
        const gifElement = document.createElement('img');
        gifElement.src = gifSource;
        gifElement.alt = flamesResult + " GIF";
        gifElement.style.width = '100%'; // Set width as needed
        gifElement.style.borderRadius = '10px'; // Optional styling
        gifContainer.appendChild(gifElement);
    }

    return flamesResult; // Return the flames result for further use
}
