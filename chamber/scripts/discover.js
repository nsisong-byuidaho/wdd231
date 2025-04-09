document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("cards-container");
  
    fetch("data/discover.json")
      .then(response => response.json())
      .then(data => {
        data.forEach((item) => {
          const card = document.createElement("div");
          card.classList.add("card");
  
          card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
              <img src="${item.image}" alt="${item.name}">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
          `;
  
          container.appendChild(card);
        });
      })
      .catch(err => {
        console.error("Error loading discover.json:", err);
        container.innerHTML = "<p>Failed to load content.</p>";
      });
  });
  
  