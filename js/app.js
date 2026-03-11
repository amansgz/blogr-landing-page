/* ===================================
   app.js  
  ==================================== */

/**
 * Mobile First Navigation with ARIA support
 * Blogr - Hamburger menu and dropdowns
 */

document.addEventListener("DOMContentLoaded", function () {
  // ===== HAMBURGER MENU =====
  const toggleButton = document.getElementById("nav-toggle");
  const mainMenu = document.getElementById("main-menu");

  if (toggleButton && mainMenu) {
    // Open / close menu on click
    toggleButton.addEventListener("click", function () {
      const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";

      // Update ARIA states
      toggleButton.setAttribute("aria-expanded", !isExpanded);
      toggleButton.setAttribute(
        "aria-label",
        isExpanded ? "Open menu" : "Close menu",
      );

      // Toggle classes for CSS
      mainMenu.classList.toggle("nav__menu--open");
      toggleButton.classList.toggle("nav__toggle--open");

      // Prevent body scroll when menu is open (mobile)
      document.body.classList.toggle("no-scroll", !isExpanded);
    });

    // Close menu with Escape key
    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        mainMenu.classList.contains("nav__menu--open")
      ) {
        toggleButton.click();

        // Return focus to the button
        toggleButton.focus();
      }
    });
  }

  // ===== DROPDOWNS =====
  const dropdownButtons = document.querySelectorAll(".nav__btn-dropdown");

  dropdownButtons.forEach((button) => {
    const dropdownId = button.getAttribute("aria-controls");
    const dropdown = document.getElementById(dropdownId);

    if (dropdown) {
      // Click to open/close dropdown
      button.addEventListener("click", function (event) {
        event.stopPropagation();

        const isExpanded = button.getAttribute("aria-expanded") === "true";

        // Close other open dropdowns
        dropdownButtons.forEach((otherBtn) => {
          if (otherBtn !== button) {
            otherBtn.setAttribute("aria-expanded", "false");
            const otherDropdownId = otherBtn.getAttribute("aria-controls");
            const otherDropdown = document.getElementById(otherDropdownId);
            if (otherDropdown) {
              otherDropdown.classList.remove("dropdown-menu--open");

              // Rotate arrow (CSS)
              otherBtn.classList.remove("nav__btn-dropdown--open");
            }
          }
        });

        // Toggle current dropdown
        button.setAttribute("aria-expanded", !isExpanded);
        dropdown.classList.toggle("dropdown-menu--open");

        // Rotate arrow (CSS)
        button.classList.toggle("nav__btn-dropdown--open");
      });

      // Close dropdown with Escape key
      button.addEventListener("keydown", function (event) {
        if (
          event.key === "Escape" &&
          button.getAttribute("aria-expanded") === "true"
        ) {
          button.click();
        }
      });

      // Close when clicking outside
      document.addEventListener("click", function (event) {
        if (
          !button.contains(event.target) &&
          !dropdown.contains(event.target)
        ) {
          if (button.getAttribute("aria-expanded") === true) {
            button.click();
          }
        }
      });
    }
  });

  // ====== RESIZE DETECTATION =====
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // If switching to desktop (>768), ensure menu is visible
      if (window.innerWidth > 768) {
        if (mainMenu && mainMenu.classList.contains("nav__menu--open")) {
          toggleButton.click(); //close mobile menu
        }
      }
    }, 250);
  });

  // ====== CLOSE WHEN CLICKING OUTSIDE (mobile only) ======
  document.addEventListener("click", function (event) {
    // only in mobile
    if (window.innerWidth <= 768) {
      if (mainMenu && mainMenu.classList.contains("nav__menu--open")) {
        // If click was not on menu or button
        if (
          !mainMenu.contains(event.target) &&
          !toggleButton.contains(event.target)
        ) {
          toggleButton.click();
        }
      }
    }
  });
});
