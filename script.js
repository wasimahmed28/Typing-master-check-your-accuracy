// Global variables
var keys = 'asdfjkl;';
var keyCount = 0;
var correctCount = 0;
var startTime;
var timerInterval;

// Get the required HTML elements
var inputBox = document.getElementById('input-box');
var nextKeysElement = document.getElementById('next-keys');
var keyCountElement = 0;
var accuracyElement = document.getElementById('accuracy');
var timerElement = document.getElementById('timer');

function countKeypresses() {
  var count = 0;
  var countElement = document.getElementById('key-count');

  document.addEventListener('keydown', function(event) {
    count++;
    countElement.innerText = 'Key count: ' + count;
  });
}

// Call the function to start counting keypresses
countKeypresses();

// Start the timer
startTimer();

// Generate and display the initial next keys
displayNextKeys();

// Event listener for input box
inputBox.addEventListener('input', function() {
  var typedText = inputBox.value;
  var nextKeys = nextKeysElement.innerText;

  // Check if the typed text matches the next keys
  if (typedText === nextKeys) {
    // Increment key count and correct count
    keyCount++;
    correctCount++;

    // Clear input box
    inputBox.value = '';

    // Generate and display new next keys
    displayNextKeys();
  } else if (typedText.length >= nextKeys.length) {
    // Increment key count
    keyCount++;

    // Clear input box
    inputBox.value = '';
  }

  // Calculate accuracy percentage
  var accuracy = Math.floor((correctCount / keyCount) * 100);

  // Update key count and accuracy elements
  keyCountElement.innerText = 'Key count: ' + keyCount;
  if (!isNaN(accuracy)) {
    accuracyElement.innerText = 'Accuracy: ' + accuracy + '%';
  }
  
});

// Function to generate and display the next keys
function displayNextKeys() {
  var randomKeys = '';
  for (var i = 0; i < 35; i++) {
    var randomIndex = Math.floor(Math.random() * keys.length);
    randomKeys += keys[randomIndex];
  }
  
  // Insert random blank spaces in the generated keys
  var numSpaces = Math.floor(Math.random() * 6) + 3; // Generate 6-3 blank spaces
  for (var j = 0; j < numSpaces; j++) {
    var randomIndex = Math.floor(Math.random() * randomKeys.length);
    randomKeys = randomKeys.substring(0, randomIndex) + ' ' + randomKeys.substring(randomIndex);
  }
  
  nextKeysElement.innerText = randomKeys;
}

// Function to start the timer
function startTimer() {
  var duration = 5 * 60; // 5 minutes in seconds
  startTime = new Date().getTime() + duration * 1000;

  timerInterval = setInterval(updateTimer, 1000);

  // Enable input box
  inputBox.disabled = false;
}

// Function to update the timer
function updateTimer() {
  var currentTime = new Date().getTime();
  var timeRemaining = Math.max(0, startTime - currentTime);

  var minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
  var seconds = Math.floor((timeRemaining / 1000) % 60);

  // Format minutes and seconds
  var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  var formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

  // Display the updated time
  timerElement.innerText = formattedMinutes + ':' + formattedSeconds;

  // Check if the time is up
  if (timeRemaining === 0) {
    clearInterval(timerInterval);

    // Calculate and display average accuracy
    var averageAccuracy = Math.floor((correctCount / keyCount) * 100);
    accuracyElement.innerText = 'Average Accuracy: ' + averageAccuracy + '%';

    // Disable input box
    inputBox.disabled = true;
  }
}
