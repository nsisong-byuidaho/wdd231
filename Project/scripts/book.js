document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting normally
  
    // Collect form data
    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const destination = document.getElementById("destination").value;
    const travelDate = document.getElementById("travelDate").value;
    const travelers = document.getElementById("travelers").value;
    const tripType = document.querySelector('input[name="tripType"]:checked').value;
    const notes = document.getElementById("notes").value;
  
    // Save the data to localStorage
    const bookingData = {
      name: name,
      email: email,
      destination: destination,
      travelDate: travelDate,
      travelers: travelers,
      tripType: tripType,
      notes: notes
    };
    localStorage.setItem("latestBooking", JSON.stringify(bookingData));
  
    // Redirect to confirmation page
    window.location.href = "confirmation.html";
  });
  