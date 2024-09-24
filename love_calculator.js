document.getElementById('loveForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;
    const lovePercentage = Math.floor(Math.random() * 101); // Random love percentage

    // Display result
    const loveResultDiv = document.getElementById('loveResult');
    loveResultDiv.innerText = `${name1} & ${name2} Love Percentage: ${lovePercentage}%`;
    loveResultDiv.classList.add('show'); // Add animation class
    
    // Store data in Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbwp9pvYlUbSSuhensJVEwp_RP7FocPCJHBHcXWzAA9y3KaJ9r6Y7GBvqKLTwszqE8ch/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ Name_1: name1, Name_2: name2, Love_Percentage: lovePercentage }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
});
