
function selectGeneration(generation) {
  window.location.href = "Index.html"; // Redirect to index.html
  localStorage.setItem('selectedGeneration', generation);
}
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
async function getPokemon(limit) {
  const generation = localStorage.getItem('selectedGeneration');
  switch (generation){
    case 'Generation 1':
          res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151'); // Limit for Generation 1
          break;
    case 'Generation 2':
          res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=251'); // Limit for Generation 2
          break;
    case 'Generation 3':
          res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=386')
          break;
    case 'Generation 4':
          res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=493');
          break;
    case 'Generation 5':
          res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=649')
          break;
    case 'Generation 6':
          res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=721')
          break;
    case 'Generation 7':
          res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=809')
          break;
    case 'Generation 8':
          res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=905')
          break;
    case 'Generation 9':
          res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
          break;

  }
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

function getPokemonImage({ url }) {
  const selectedStyle = localStorage.getItem('selectedStyle');
  // Extract the Pokémon number from the URL
  const number = getNumber(url);
  console.log(selectedStyle);
  switch (selectedStyle) {
    case 'drawn':
      // Construct URL for drawn style
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;
    case '3D':
      // Construct URL for 3D style
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${number}.png`;
  }
}

// Function to extract the Pokémon number from the URL
function getNumber(url) {
    // Regular expression to extract the number from the end of the URL
    const numberRegEx = /(\d+)\/$/;
    // Use the regular expression to extract the number from the URL
    return (url.match(numberRegEx) || [])[1];
}
