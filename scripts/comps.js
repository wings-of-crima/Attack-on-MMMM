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

  function normalizePath(pathname) {
    const file = pathname.split("/").pop();
    return (file && file.length > 0 ? file : "index.html").toLowerCase();
  }

  function setActiveNavLink() {
    const navRoot = document.querySelector("#headerNav-placeholder nav");
    if (!navRoot) return;

    const currentPage = normalizePath(window.location.pathname);
    const navLinks = navRoot.querySelectorAll(".nav-link[href]");
    const dropdownItems = navRoot.querySelectorAll(".dropdown-menu .dropdown-item[href]");

    navLinks.forEach((link) => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    });
    dropdownItems.forEach((item) => {
      item.classList.remove("active");
      item.removeAttribute("aria-current");
    });

    let matchedLink = null;
    let matchedDropdownItem = null;

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http")) return;

      const targetPage = normalizePath(new URL(href, window.location.href).pathname);
      if (targetPage === currentPage) {
        matchedLink = link;
      }
    });
    dropdownItems.forEach((item) => {
      const href = item.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http")) return;

      const targetPage = normalizePath(new URL(href, window.location.href).pathname);
      if (targetPage === currentPage) {
        matchedDropdownItem = item;
      }
    });

    if (matchedLink) {
      matchedLink.classList.add("active");
      matchedLink.setAttribute("aria-current", "page");
    }

    if (matchedDropdownItem) {
      matchedDropdownItem.classList.add("active");
      matchedDropdownItem.setAttribute("aria-current", "page");

      const parentDropdown = matchedDropdownItem.closest(".nav-item.dropdown");
      const parentToggle = parentDropdown?.querySelector(".nav-link.dropdown-toggle");

      if (parentToggle) {
        parentToggle.classList.add("active");
        parentToggle.setAttribute("aria-current", "page");
      }
    }
  }

  await loadComponent("headerNav-placeholder", "components/headerNav.html", "header nav");
  setActiveNavLink();

  await loadComponent("footer-placeholder", "components/footer.html", "footer");
});
