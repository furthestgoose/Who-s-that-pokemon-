// Declare global variables
let gameData; // Data for the current game
let count = 0; // Total number of attempts
let correct = 0; // Total number of correct guesses
let correct_audio = new Audio('Sound/correct.mp3'); // Audio for correct guess
let incorrect_audio = new Audio('Sound/wrong.mp3'); // Audio for incorrect guess
let background = new Audio('Sound/Background.mp3'); // Background audio
let isMuted = false; // Flag to track mute status

// Select DOM elements
const main = document.querySelector('main'); // Main container
const pokemonImage = document.querySelector('#pokemon-image'); // Pokémon image
const textOverlay = document.querySelector('#text-overlay'); // Text overlay
const choices = document.querySelector('#choices'); // Choices container
const playBtn = document.querySelector('#play'); // Play button
const muteButton = document.querySelector('#muteButton'); // Mute button

// Event listeners
playBtn.addEventListener('click', fetchData); // Event listener for play button
muteButton.addEventListener('click', toggleMute); // Event listener for mute button
addAnswerHandler(); // Add event handler for choices

// Function to fetch data for the game
async function fetchData() {
    count++; // Increment attempt count
    document.getElementById('counter').textContent = correct + "/" + count + " Correct"; // Update counter display
    playBtn.removeEventListener('click', fetchData); // Remove event listener from play button
    document.getElementById('pokeball').style.visibility = 'hidden'; // Hide Pokéball
    playBtn.innerHTML = "Next"; // Change play button text to "Next"
    resetImage(); // Reset Pokémon image
    gameData = await window.getPokeData(); // Fetch game data
    if (!main.classList.contains('revealed')) {
        showSilhouetteWithTransition(); // Show Pokémon silhouette with transition
    }
    displayChoices(); // Display choices
}

// Function to toggle mute status
function toggleMute() {
    console.log("Mute button clicked");
    if (background.paused) {
        background.loop = true;
        background.play();
        speakerIcon.classList.remove('fa-volume-off');
        speakerIcon.classList.add('fa-volume-up');
    } else {
        background.pause();
        speakerIcon.classList.remove('fa-volume-up');
        speakerIcon.classList.add('fa-volume-off');
    }
    isMuted = !isMuted; // Toggle mute status
}

// Function to reset Pokémon image
function resetImage() {
    pokemonImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D'; // Set placeholder image
    main.classList.add('fetching'); // Add 'fetching' class to main container
    main.classList.remove('revealed'); // Remove 'revealed' class from main container
}

// Function to show Pokémon silhouette with transition
function showSilhouetteWithTransition() {
    main.classList.remove('fetching'); // Remove 'fetching' class from main container
    pokemonImage.style.opacity = '0'; // Set opacity of Pokémon image to 0
    pokemonImage.style.visibility = 'hidden'; // Hide Pokémon image
    pokemonImage.src = gameData.correct.image; // Set Pokémon image source
    setTimeout(() => {
        pokemonImage.style.opacity = '1'; // Set opacity of Pokémon image to 1 after timeout
        pokemonImage.style.visibility = 'visible'; // Show Pokémon image after timeout
    }, 100); // Timeout duration
}

// Function to display choices
function displayChoices() {
    playBtn.removeEventListener('click', fetchData); // Remove event listener from play button
    const { pokemonChoices } = gameData; // Get Pokémon choices from game data
    const choicesHTML = pokemonChoices.map(({ name }) => {
        return `<button data-name="${name}">${name}</button>`; // Generate HTML for each choice button
    }).join(''); // Join HTML for all choice buttons
    choices.innerHTML = choicesHTML; // Insert HTML for choice buttons into choices container
}

// Function to add event handler for choices
function addAnswerHandler() {
    choices.addEventListener('click', function(e) {
        if (e.target.tagName.toLowerCase() === 'button' && !main.classList.contains('revealed')) {
            const { name } = e.target.dataset; // Get name of clicked choice
            const resultClass = (name === gameData.correct.name) ?
                'correct' : 'incorrect'; // Determine result class based on correctness
            if (resultClass === 'correct') {
                if (isMuted) {
                    correct_audio.play(); // Play audio for correct guess if not muted
                }
                correct++; // Increment correct guess count
            } else {
                if (isMuted) {
                    incorrect_audio.play(); // Play audio for incorrect guess if not muted
                }
            }
            document.getElementById('counter').textContent = correct + "/" + count + " Correct"; // Update counter display
            e.target.classList.add(resultClass); // Add result class to clicked choice button
            revealPokemon(); // Reveal Pokémon after choice is made
        }
    });
}

// Function to reveal Pokémon
function revealPokemon() {
    if (event.target.tagName.toLowerCase() === 'button') {
        main.classList.add('revealed'); // Add 'revealed' class to main container
        textOverlay.textContent = `${gameData.correct.name}!`; // Display correct Pokémon name in text overlay
        playBtn.addEventListener('click', fetchData); // Add event listener to play button for next round
    }
}
