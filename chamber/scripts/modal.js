document.addEventListener("DOMContentLoaded", function () {
    // Set timestamp
    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    // Function to open a modal
    window.openModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "flex";
        }
    };

    // Function to close a modal
    window.closeModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
        }
    };

    // Close modal when clicking outside of it
    window.addEventListener("click", function (event) {
        document.querySelectorAll(".modal").forEach((modal) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });

   // Function to get query parameters and populate the page
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    console.log('Query Parameters:', params.toString()); // Log all query parameters

    // Update page with the query parameters
    document.getElementById("firstName").textContent = params.get("firstName") || "N/A";
    document.getElementById("lastName").textContent = params.get("lastName") || "N/A";
    document.getElementById("email").textContent = params.get("email") || "N/A";
    document.getElementById("mobile").textContent = params.get("mobile") || "N/A";
    document.getElementById("businessName").textContent = params.get("businessName") || "N/A";

    // Format the submitted timestamp into a readable format
    const timestamp = params.get("timestamp");
    if (timestamp) {
        const date = new Date(timestamp);
        // Format it to something like 'April 3, 2025'
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById("submittedTimestamp").textContent = formattedDate;
    } else {
        document.getElementById("submittedTimestamp").textContent = "N/A";
    }

    // Set current year and last modified date
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;
    document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;
}

// Call the function when the page loads
window.onload = getQueryParams;


});
