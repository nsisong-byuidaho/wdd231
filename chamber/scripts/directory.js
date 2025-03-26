document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members-container");
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");

    // Fetch members.json and populate the directory
    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error("Error fetching members:", error);
            membersContainer.innerHTML = "<p class='error'>Failed to load members. Please try again later.</p>";
        }
    }

    // Display members in either grid or list view
    function displayMembers(members) {
        membersContainer.innerHTML = ""; // Clear existing content

        members.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("member-card");

            memberCard.innerHTML = `
                <img src="${member.image}" alt="Logo of ${member.name}" class="member-img">
                <h3>${member.name}</h3>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
                <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
                <span class="membership-level level-${member.membership}">Level ${member.membership}</span>
            `;

            membersContainer.appendChild(memberCard);
        });
    }

    // Toggle between grid and list views
    gridViewBtn.addEventListener("click", () => {
        membersContainer.classList.add("grid-view");
        membersContainer.classList.remove("list-view");
    });

    listViewBtn.addEventListener("click", () => {
        membersContainer.classList.add("list-view");
        membersContainer.classList.remove("grid-view");
    });

    // Fetch members when the page loads
    fetchMembers();
});
