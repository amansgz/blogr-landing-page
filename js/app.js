document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav__toggle");
  const navMenu = document.querySelector(".nav__menu");
  const dropdownBtns = document.querySelectorAll(".nav__link--dropdown-btn");

  //  Mobile Hamburger Menu
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("is-active");
      navMenu.classList.toggle("is-active");
    });
  }

  //  DROPDOWNS
  dropdownBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation(); // prevent click close dropdown

      const currentDropdown = this.closest(".nav__item--dropdown");

      dropdownBtns.forEach((otherBtn) => {
        const otherDropdown = otherBtn.closest(".nav__item--dropdown");

        if (otherDropdown !== currentDropdown) {
          otherDropdown.classList.remove("is-active");
        }
      });
      currentDropdown.classList.toggle("is-active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav__item--dropdown")) {
      dropdownBtns.forEach((btn) => {
        btn.closest(".nav__item--dropdown").classList.remove("is-active");
      });
    }
  });
});
