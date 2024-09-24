let lastFlamesName1 = '';
let lastFlamesName2 = '';

document.getElementById('flamesForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const flamesName1 = document.getElementById('flamesName1').value;
    const flamesName2 = document.getElementById('flamesName2').value;

    // Check if the names are the same as the last used
    if (flamesName1 === lastFlamesName1 && flamesName2 === lastFlamesName2) {
        alert("You've already calculated the result for these names!");
        return; // Exit the function without calculating again
    }

    // Update the last used names
    lastFlamesName1 = flamesName1;
    lastFlamesName2 = flamesName2;

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

    let gifSource = getGifSource(flamesResult);
    
    // Create and append the GIF
    if (gifSource) {
        const gifElement = document.createElement('img');
        gifElement.src = gifSource;
        gifElement.alt = flamesResult + " GIF";
        gifElement.style.width = '30%'; // Decreased width
        gifElement.style.height = 'auto'; // Maintain aspect ratio or adjust height as needed
        gifElement.style.borderRadius = '10px'; // Optional styling
        gifContainer.appendChild(gifElement);
    }
    
    adjustResultHeight(resultElement);
    return flamesResult; // Return the flames result for further use
}

// Function to get GIF source based on result
function getGifSource(flamesResult) {
    switch (flamesResult) {
        case 'Friend':
            return 'https://i.pinimg.com/originals/e0/99/32/e09932efb91cc5a1bf98fc2daf268105.gif';
        case 'Love':
            return 'https://i.pinimg.com/originals/fa/04/cc/fa04ccdf3e8a38a572513394a8dca0d7.gif';
        case 'Affection':
            return 'https://i.pinimg.com/originals/93/ff/34/93ff34b2f210c60f5ead72c5e5e34cd4.gif';
        case 'Marriage':
            return 'https://i.pinimg.com/originals/80/4a/7b/804a7b8872de5db7d3dee11a94a89449.gif';
        case 'Enemy':
            return 'https://i.pinimg.com/originals/da/c7/c5/dac7c51ffd17db5b23d5bbfc5c7dd9d5.gif';
        case 'Siblings':
            return 'https://i.pinimg.com/originals/3f/e8/43/3fe8433ae317c57b9ff0268d8a1e8b2e.gif';
        default:
            return 'path/to/default.gif'; // Default GIF if no result matches
    }
}

// Function to adjust the result height
function adjustResultHeight(resultElement) {
    if (resultElement.classList.contains('show')) {
        // If the result is shown, decrease height
        resultElement.style.height = '10px'; // Adjust this as necessary
        resultElement.style.lineHeight = '10px'; // Center text vertically
    } else {
        // Reset height to original
        resultElement.style.height = '50px'; // Initial height
        resultElement.style.lineHeight = '50px'; // Center text vertically
    }
}
