// Import the getDestinations function from the data.js file
import { getDestinations } from './data.js';

// Import the renderDestinations function from the destinations.js file
import { renderDestinations } from './destinations.js';

// Event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  // Fetch the destinations data from the data.js file
  const destinations = await getDestinations();
  
  // Render the fetched destinations by passing the data to the renderDestinations function
  renderDestinations(destinations);
});
