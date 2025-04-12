// Function to render destinations dynamically into the HTML container
export function renderDestinations(destinations) {
  // Get the container where the destination cards will be rendered
  const container = document.getElementById('destinationContainer');
  
  // Use map to create HTML for each destination, then join them into one string and inject into the container
  container.innerHTML = destinations.map(dest => `
    <div class="destination-card">
      <!-- Destination image -->
      <img src="${dest.image}" alt="${dest.name}">
      <div class="card-content">
        <!-- Destination name and location -->
        <h3>${dest.name}, ${dest.location}</h3>
        <!-- Destination description -->
        <p>${dest.description}</p>
        <div class="card-details">
          <!-- Price and duration of the destination -->
          <span>$${dest.price}</span>
          <span>${dest.duration}</span>
        </div>
        <!-- Button to view more details -->
        <button class="view-btn" data-name="${dest.name}">View More</button>
      </div>
    </div>
  `).join('');
  
  // Add event listeners to each "View More" button to show the modal when clicked
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      // Get the name of the destination from the data attribute
      const name = e.target.dataset.name;
      // Find the destination object that matches the name
      const dest = destinations.find(d => d.name === name);
      // Call function to show the modal with the destination details
      showModal(dest);
    });
  });
}

// Function to display the modal with detailed information about the destination
function showModal(dest) {
  // Get the modal element
  const modal = document.getElementById('modal');
  
  // Set the content of the modal dynamically based on the selected destination
  modal.innerHTML = `
    <div class="modal-content">
      <!-- Close button for the modal -->
      <span class="close-btn">&times;</span>
      <h2>${dest.name}</h2>
      <!-- Destination image -->
      <img src="${dest.image}" alt="${dest.name}" />
      <p><strong>Location:</strong> ${dest.location}</p>
      <p><strong>Price:</strong> $${dest.price}</p>
      <p><strong>Duration:</strong> ${dest.duration}</p>
      <p>${dest.description}</p>
    </div>
  `;
  
  // Show the modal by setting the display style to 'block'
  modal.style.display = 'block';
  
  // Add event listener to close the modal when the close button is clicked
  modal.querySelector('.close-btn').onclick = () => {
    // Hide the modal when the close button is clicked
    modal.style.display = 'none';
  };
  
  // Add event listener to close the modal when clicking outside the modal content
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}
