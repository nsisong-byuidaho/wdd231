
// Function to fetch and display spotlight members
async function loadSpotlights() {
    const spotlightContainer = document.getElementById("spotlight-container");

    if (!spotlightContainer) {
        console.error("❌ ERROR: Element with ID 'spotlight-container' not found.");
        return;
    }

    try {
        console.log("📢 Fetching members data...");
        const response = await fetch("data/members.json"); 

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Members Data Loaded:", data);

        if (!data || !Array.isArray(data)) {
            throw new Error("❌ ERROR: Invalid data structure - Expected an array.");
        }

        // 🔹 Filter only "Gold" and "Silver" members
        const spotlightMembers = data.filter(member => 
            member.membership === "Gold" || member.membership === "Silver"
        );

        if (spotlightMembers.length === 0) {
            console.warn("⚠️ No Gold or Silver members found.");
            return;
        }

        // 🔀 Shuffle and pick 2 or 3 members
        const shuffled = spotlightMembers.sort(() => Math.random() - 0.5);
        const selectedMembers = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);

 
        spotlightContainer.innerHTML = "";

        // 🔹 Display the spotlight members
        selectedMembers.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("spotlight-card");
            memberCard.innerHTML = `
                <div class="spotlight-content">
                    <img src="${member.image}" alt="${member.name} Logo">
                    <h3>${member.name}</h3>
                    <p><strong>Membership:</strong> ${member.membership} Member</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <a href="${member.website}" target="_blank">🌐 Visit Website</a>
                </div>
            `;
            spotlightContainer.appendChild(memberCard);
        });

        console.log("✅ Spotlight members displayed successfully.");

    } catch (error) {
        console.error("❌ ERROR fetching members data:", error);
    }
}

// Run functions when the page loads
document.addEventListener("DOMContentLoaded", () => {
    updateFooter();
    loadSpotlights();
});
