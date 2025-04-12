// Asynchronous function to fetch destinations data
export async function getDestinations() {
    try {
      // Check if the destinations data is already cached in localStorage
      const cached = localStorage.getItem('destinations');
      
      // If cached data exists, parse it and return immediately to avoid unnecessary fetch
      if (cached) {
        return JSON.parse(cached); // Return the cached destinations
      }
  
      // If no cached data, fetch the destinations from the provided JSON file
      const response = await fetch('./data/destinations.json');
      
      // If the response is not successful (status code not in the 200-299 range), throw an error
      if (!response.ok) throw new Error('Failed to fetch destinations');
  
      // Parse the response JSON data
      const data = await response.json();
      
      // Cache the fetched data in localStorage for future use
      localStorage.setItem('destinations', JSON.stringify(data));
      
      // Return the fetched data
      return data;
    } catch (error) {
      // If there's an error (either fetching or parsing), log it to the console
      console.error('Error fetching destinations:', error);
      
      // Return an empty array in case of error, so the application can still function
      return [];
    }
}
