const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const backToTopButton = document.querySelector(".back-to-top");

const updateActiveSection = () => {
  const marker = window.scrollY + 150;
  let current = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= marker) current = section.id;
  });

  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("is-active", isCurrent);
    if (isCurrent) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });

  backToTopButton.classList.toggle("is-visible", window.scrollY > 500);
};

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
updateActiveSection();
window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("resize", updateActiveSection);
