document.addEventListener("DOMContentLoaded", async () => {
  async function loadComponent(placeholderId, filePath, errorLabel) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}: ${response.status}`);
      }

      placeholder.innerHTML = await response.text();
    } catch (error) {
      console.error(`Error loading ${errorLabel}:`, error);
    }
  }

  await loadComponent("headerNav-placeholder", "components/headerNav.html", "header nav");
  await loadComponent("footer-placeholder", "components/footer.html", "footer");
});
