// Function to fetch data for the Pokémon game
window.getPokeData = async function() {
    // Get a list of Pokémon from the API
    const pokemon = await getPokemon();
    // Shuffle the list of Pokémon
    const randomPokemon = shuffle(pokemon);
    // Get four random Pokémon choices
    const pokemonChoices = get4Pokemon(randomPokemon);
    // Get the first Pokémon choice
    const [ firstPokemon ] = pokemonChoices;
    // Get the image URL for the first Pokémon
    const image = getPokemonImage(firstPokemon);
  
    // Return an object containing shuffled Pokémon choices and information about the correct Pokémon
    return { 
      pokemonChoices: shuffle(pokemonChoices),
      correct: {
        image,
        name: firstPokemon.name,
      }
    };
  };
  
// Function to fetch Pokémon data from the PokeAPI
async function getPokemon() {
    // Fetch Pokémon data from the API
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
    // Convert the response to JSON
    const pokemon = await res.json();
    
    // Return the list of Pokémon
    return pokemon.results;
}

// Function to shuffle an array
function shuffle(unshuffled) {
    const shuffled = unshuffled
      // Add a random sort key to each element of the array
      .map((value) => ({ value, sort: Math.random() }))
      // Sort the array based on the random sort key
      .sort((a, b) => a.sort - b.sort)
      // Remove the sort key and return the shuffled array
      .map(({ value }) => value);
    
    return shuffled;
}

// Function to get four Pokémon choices
function get4Pokemon(randomPokemon) {
    // Take the first four elements from the array of Pokémon
    return randomPokemon.splice(0, 4);
}

// Function to get the image URL for a Pokémon
function getPokemonImage({ url }) {
    // Extract the Pokémon number from the URL
    const number = getNumber(url);
    // Return the URL of the Pokémon image
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;
};

// Function to extract the Pokémon number from the URL
function getNumber(url) {
    // Regular expression to extract the number from the end of the URL
    const numberRegEx = /(\d+)\/$/;
    // Use the regular expression to extract the number from the URL
    return (url.match(numberRegEx) || [])[1];
}
