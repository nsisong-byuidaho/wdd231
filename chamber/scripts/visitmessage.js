document.addEventListener("DOMContentLoaded", () => {
    const messageContainer = document.getElementById("visit-message");

    const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = Date.now();

    let message = "";

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((currentVisit - Number(lastVisit)) / MILLISECONDS_IN_A_DAY);

        if (daysSinceLastVisit < 1) {
            message = "Back so soon! Awesome!";
        } else if (daysSinceLastVisit === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${daysSinceLastVisit} days ago.`;
        }
    }

    messageContainer.textContent = message;
    localStorage.setItem("lastVisit", currentVisit);
});
