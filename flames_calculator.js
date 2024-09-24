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
            gifSource = 'https://i.pinimg.com/originals/e0/99/32/e09932efb91cc5a1bf98fc2daf268105.gif'; // Change this to your friend's GIF URL
            break;
        case 'Love':
            gifSource = 'https://i.pinimg.com/originals/fa/04/cc/fa04ccdf3e8a38a572513394a8dca0d7.gif'; // Change this to your love GIF URL
            break;
        case 'Affection':
            gifSource = 'https://i.pinimg.com/originals/93/ff/34/93ff34b2f210c60f5ead72c5e5e34cd4.gif'; // Change this to your affection GIF URL
            break;
        case 'Marriage':
            gifSource = 'https://i.pinimg.com/originals/80/4a/7b/804a7b8872de5db7d3dee11a94a89449.gif'; // Change this to your marriage GIF URL
            break;
        case 'Enemy':
            gifSource = 'https://i.pinimg.com/originals/da/c7/c5/dac7c51ffd17db5b23d5bbfc5c7dd9d5.gif'; // Change this to your enemy GIF URL
            break;
        case 'Siblings':
            gifSource = 'https://i.pinimg.com/originals/3f/e8/43/3fe8433ae317c57b9ff0268d8a1e8b2e.gif'; // Change this to your siblings GIF URL
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
