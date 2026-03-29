window.addEventListener("DOMContentLoaded", () => {
  const themeLinkId = "theme-stylesheet";
  const storageKey = "selectedThemeHref";
  const defaultThemeHref = "styles/main.css";

  const themeMap = {
    "default": defaultThemeHref,
    "old-hundred": "styles/oldTheme.css",
    "first-nine-hundred": "styles/firstHalfTheme.css",
    "second-nine-hundred": "styles/secondHalfTheme.css",
    "future": "styles/futureTheme.css"
  };

  const themeLink = document.getElementById(themeLinkId);
  if (!themeLink) return;

  function applyTheme(href) {
    themeLink.setAttribute("href", href);
    sessionStorage.setItem(storageKey, href);
  }

  // Keep the chosen theme while navigating during the current session only.
  const savedTheme = sessionStorage.getItem(storageKey);
  if (savedTheme && Object.values(themeMap).includes(savedTheme)) {
    applyTheme(savedTheme);
  } else {
    themeLink.setAttribute("href", defaultThemeHref);
    sessionStorage.removeItem(storageKey);
  }

  document.addEventListener("click", (event) => {
    const themeTrigger = event.target.closest("#dropdown-themes .dropdown-item, .theme-btn");

    if (!themeTrigger) return;

    event.preventDefault();

    const themeId = themeTrigger.id;
    const href = themeMap[themeId];

    if (href) {
      applyTheme(href);
    }
  });
});
