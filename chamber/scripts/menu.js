document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector("nav");
    const menuButton = document.createElement("button");

    menuButton.textContent = "☰ Menu";
    menuButton.id = "menu-button";
    menuButton.setAttribute("aria-label", "Toggle navigation menu");
    menuButton.setAttribute("aria-expanded", "false");

    // Check if button already exists before adding
    if (!document.getElementById("menu-button")) {
        nav.prepend(menuButton);
    }

    menuButton.addEventListener("click", function () {
        const navMenu = nav.querySelector("ul"); // Target the menu list
        navMenu.classList.toggle("open");

        // ARIA expanded attribute
        const isOpen = navMenu.classList.contains("open");
        menuButton.setAttribute("aria-expanded", isOpen.toString());
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!nav.contains(event.target) && nav.querySelector("ul").classList.contains("open")) {
            nav.querySelector("ul").classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
});
