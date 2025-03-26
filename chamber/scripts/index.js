const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
const city = "Eket"; 

async function fetchWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    
    document.getElementById("temperature").textContent = Math.round(data.main.temp);
    document.getElementById("description").textContent = data.weather[0].description;
}

// Run function when page loads
fetchWeather();

async function loadSpotlights() {
    const response = await fetch("data/members.json");
    const members = await response.json();

    // Filter only Gold and Silver members
    const spotlightMembers = members.filter(member => 
        member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
    );

    // Randomly select 2 or 3 members
    const selectedSpotlights = spotlightMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    const container = document.getElementById("spotlight-container");
    container.innerHTML = "";

    selectedSpotlights.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");
        card.innerHTML = `
            <img src="${member.logo}" alt="${member.name} Logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership">${member.membershipLevel} Member</p>
        `;
        container.appendChild(card);
    });
}

// Run function when page loads
loadSpotlights();
