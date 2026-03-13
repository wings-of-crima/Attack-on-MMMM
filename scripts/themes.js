window.addEventListener("DOMContentLoaded", () => {
  const themeLinkId = "theme-stylesheet";
  const storageKey = "selectedThemeHref";

  const themeMap = {
    "default": "styles/main.css",
    "old-hundred": "styles/oldTheme.css",
    "first-nine-hundred": "styles/firstHalfTheme.css",
    "second-nine-hundred": "styles/secondHalfTheme.css",
    "future": "styles/futureTheme.css"
  };

  const themeLink = document.getElementById(themeLinkId);
  if (!themeLink) return;

  function applyTheme(href) {
    themeLink.setAttribute("href", href);
    localStorage.setItem(storageKey, href);
  }

  // Load saved theme on page load
  const savedTheme = localStorage.getItem(storageKey);
  if (savedTheme && Object.values(themeMap).includes(savedTheme)) {
    applyTheme(savedTheme);
  }

  // UPDATED EVENT LISTENER
  document.addEventListener("click", (event) => {
    // 1. Check if the click was on a dropdown item OR one of the theme buttons in the section
    const themeTrigger = event.target.closest("#dropdown-themes .dropdown-item, .theme-btn");
    
    if (!themeTrigger) return;

    // 2. Prevent default link behavior if it's an <a> tag
    event.preventDefault();

    // 3. Get the ID of the clicked element and find the matching CSS in the map
    const themeId = themeTrigger.id;
    const href = themeMap[themeId];

    if (href) {
      applyTheme(href);
    }
  });
});