document.addEventListener('DOMContentLoaded', function () {
    // Get query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);

    // Get the booking details from the URL
    const fullName = urlParams.get('fullName');
    const email = urlParams.get('email');
    const destination = urlParams.get('destination');
    const travelDate = urlParams.get('travelDate');
    const travelers = urlParams.get('travelers');
    const tripType = urlParams.get('tripType');
    const notes = urlParams.get('notes') || "No additional notes provided.";

    // Get the confirmation container element
    const confirmationContainer = document.getElementById('confirmation-details');

    // Create and insert the confirmation message
    confirmationContainer.innerHTML = `
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Destination:</strong> ${destination}</p>
        <p><strong>Travel Date:</strong> ${travelDate}</p>
        <p><strong>Number of Travelers:</strong> ${travelers}</p>
        <p><strong>Trip Type:</strong> ${tripType}</p>
        <p><strong>Additional Notes:</strong> ${notes}</p>
    `;
});
