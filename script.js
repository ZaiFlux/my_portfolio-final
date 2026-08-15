// ==========================================
// ABOUT SECTION - SMOOTH SCROLL WITHIN CONTAINER
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  // Get all about navigation links
  const aboutNavLinks = document.querySelectorAll(".about-nav a");
  const aboutContent = document.querySelector(".about-content");

  if (aboutNavLinks.length && aboutContent) {
    aboutNavLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent page jump

        // Get the target section ID from href
        const targetId = this.getAttribute("href").substring(1); // Remove #
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          // Calculate the scroll position within the about-content container
          // For "about-intro", scroll to the very top (0)
          // For others, scroll to their position with offset
          let targetOffset = targetSection.offsetTop;

          // If it's the intro section, scroll to top
          if (targetId === "about-intro") {
            targetOffset = 0;
          } else {
            targetOffset = targetOffset - 20; // Small offset for better visibility
          }

          // Smooth scroll within the container
          aboutContent.scrollTo({
            top: targetOffset,
            behavior: "smooth",
          });
        }
      });
    });
  }
});

// ==========================================
// CERTIFICATES SECTION
// ==========================================

const categories = document.querySelectorAll(".certificate-categories li");
const title = document.getElementById("certificate-title");
// Make sure subtitle is defined
const subtitle =
  document.querySelector(".certificate-subtitle") ||
  document.createElement("p");

categories.forEach((category) => {
  category.addEventListener("click", () => {
    // Remove active class
    categories.forEach((item) => item.classList.remove("active"));

    // Add active class
    category.classList.add("active");

    // Update heading
    title.textContent = category.dataset.category;

    // Update subtitle using the count
    const count = category.querySelector(".count").textContent;

    // Check if subtitle exists, if not create one
    if (document.querySelector(".certificate-subtitle")) {
      document.querySelector(".certificate-subtitle").textContent =
        count + (count === "1" ? " Certificate" : " Certificates");
    } else {
      // Create subtitle if it doesn't exist
      const sub = document.createElement("p");
      sub.className = "certificate-subtitle";
      sub.textContent =
        count + (count === "1" ? " Certificate" : " Certificates");
      title.parentNode.appendChild(sub);
    }
  });
});
