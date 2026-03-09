
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

  const themeLink =
    document.getElementById(themeLinkId) ||
    document.querySelector('link[rel="stylesheet"][href^="styles/"]');

  if (!themeLink) return;

  function applyTheme(href) {
    themeLink.setAttribute("href", href);
    localStorage.setItem(storageKey, href);
  }

  const savedTheme = localStorage.getItem(storageKey);
  if (savedTheme && Object.values(themeMap).includes(savedTheme)) {
    applyTheme(savedTheme);
  }

  // Event delegation works even if navbar is injected later by comps.js
  document.addEventListener("click", (event) => {
    const item = event.target.closest("#dropdown-themes .dropdown-item");
    if (!item) return;

    event.preventDefault();
    const href = themeMap[item.id];
    if (!href) return;

    applyTheme(href);
  });
});
