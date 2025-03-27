document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members-container");
    const spotlightContainer = document.getElementById("spotlight-container"); 
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");

    console.log("directory.js is running...");

    // Fetch members.json and populate directory & spotlight
    async function fetchMembers() {
        try {
            console.log("Fetching members.json...");
            const response = await fetch("data/members.json");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const members = await response.json();
            console.log("Fetched Members Data:", members);

            displayMembers(members);
            displaySpotlight(members);
        } catch (error) {
            console.error("Error fetching members:", error);
            if (membersContainer) {
                membersContainer.innerHTML = "<p class='error'>Failed to load members. Please try again later.</p>";
            }
            if (spotlightContainer) {
                spotlightContainer.innerHTML = "<p class='error'>No spotlights available.</p>";
            }
        }
    }

    // Display members in directory
    function displayMembers(members) {
        if (!membersContainer) return;
        membersContainer.innerHTML = ""; 
        console.log("Displaying members:", members);

        members.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("member-card");

            memberCard.innerHTML = `
                <img src="${member.image}" alt="Logo of ${member.name}" class="member-img">
                <h3>${member.name}</h3>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
                <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
                <span class="membership-level level-${member.membership.toLowerCase()}">Level ${member.membership}</span>
            `;

            membersContainer.appendChild(memberCard);
        });

        console.log("Members successfully displayed.");
    }

    // Display member spotlights (Gold & Silver members)
    function displaySpotlight(members) {
        if (!spotlightContainer) return;
        spotlightContainer.innerHTML = ""; 
        console.log("Filtering spotlight members...");

        // Filter for Gold & Silver members
        const spotlightMembers = members.filter(member => 
            member.membership.toLowerCase() === "gold" || member.membership.toLowerCase() === "silver"
        );

        console.log("Eligible Spotlight Members:", spotlightMembers);

        if (spotlightMembers.length === 0) {
            spotlightContainer.innerHTML = "<p>No spotlight members available.</p>";
            return;
        }

        // Randomly select 2 or 3 unique spotlight members
        const selectedSpotlights = [];
        while (selectedSpotlights.length < Math.min(3, spotlightMembers.length)) {
            const randomIndex = Math.floor(Math.random() * spotlightMembers.length);
            const selectedMember = spotlightMembers[randomIndex];
            
            // Prevent duplicates
            if (!selectedSpotlights.includes(selectedMember)) {
                selectedSpotlights.push(selectedMember);
            }
        }

        console.log("Selected Spotlight Members:", selectedSpotlights);

        // Wrap spotlights in a flex container
        const spotlightWrapper = document.createElement("div");
        spotlightWrapper.classList.add("spotlight-wrapper");

        // Populate spotlights in HTML
        selectedSpotlights.forEach(member => {
            const spotlightCard = document.createElement("div");
            spotlightCard.classList.add("spotlight-card");

            spotlightCard.innerHTML = `
                <img src="${member.image}" alt="${member.name}" class="spotlight-img">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
            `;

            spotlightWrapper.appendChild(spotlightCard);
        });

        spotlightContainer.appendChild(spotlightWrapper);
        console.log("Spotlight members displayed.");
    }

    // Toggle between grid and list views
    if (gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener("click", () => {
            console.log("Grid view activated");
            membersContainer.classList.add("grid-view");
            membersContainer.classList.remove("list-view");
        });

        listViewBtn.addEventListener("click", () => {
            console.log("List view activated");
            membersContainer.classList.add("list-view");
            membersContainer.classList.remove("grid-view");
        });
    }

    // Fetch members when the page loads
    fetchMembers();
});
