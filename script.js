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
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          let targetOffset = targetSection.offsetTop;

          if (targetId === "about-intro") {
            targetOffset = 0;
          } else {
            targetOffset = targetOffset - 20;
          }

          aboutContent.scrollTo({
            top: targetOffset,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // ==========================================
  // CERTIFICATES SECTION - FILTERING
  // ==========================================

  // Get all elements
  const categories = document.querySelectorAll(".certificate-categories li");
  const allCards = document.querySelectorAll(".certificate-card");
  const emptyState = document.querySelector(".empty-certificates");
  const title = document.getElementById("certificate-title");

  // Function to filter certificates
  function filterCertificates(category) {
    let visibleCount = 0;

    // If 'all' is selected, show all cards
    if (category === "all") {
      allCards.forEach((card) => {
        card.style.display = "flex";
        visibleCount++;
      });
      if (emptyState) emptyState.style.display = "none";
      if (title) title.textContent = "All Certifications";
    } else {
      // Otherwise filter by category
      allCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (cardCategory === category) {
          card.style.display = "flex";
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });

      // Update title with category name
      if (title) {
        const categoryMap = {
          aws: "AWS Certifications",
          terraform: "Terraform Certifications",
          linux: "Linux Certifications",
          kubernetes: "Kubernetes Certifications",
          security: "Security Certifications",
          cloud: "Cloud Certifications",
          devops: "DevOps Certifications",
        };
        title.textContent =
          categoryMap[category] ||
          category.charAt(0).toUpperCase() +
            category.slice(1) +
            " Certifications";
      }

      // Show/hide empty state
      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.style.display = "flex";
        } else {
          emptyState.style.display = "none";
        }
      }
    }

    // Update category counts
    updateCounts();
  }

  // Function to update counts
  function updateCounts() {
    categories.forEach((category) => {
      const categoryType = category.getAttribute("data-category");
      const countSpan = category.querySelector(".count");

      if (categoryType === "all") {
        // Count all certificates
        const total = document.querySelectorAll(".certificate-card").length;
        if (countSpan) countSpan.textContent = total;
      } else {
        // Count only matching category
        const count = document.querySelectorAll(
          `.certificate-card[data-category="${categoryType}"]`,
        ).length;
        if (countSpan) countSpan.textContent = count;
      }
    });
  }

  // Add click event to each category
  categories.forEach((category) => {
    category.addEventListener("click", function () {
      // Remove active class from all
      categories.forEach((item) => item.classList.remove("active"));

      // Add active class to clicked
      this.classList.add("active");

      // Get category from data attribute
      const categoryType = this.getAttribute("data-category");

      // Filter certificates
      filterCertificates(categoryType);
    });
  });

  // Initialize - show all certificates
  filterCertificates("all");
});

// Make filterCertificates globally accessible for onclick attributes
function filterCertificates(category) {
  // This will be replaced by the DOMContentLoaded version
  // But we keep it for compatibility with onclick attributes
  const allCards = document.querySelectorAll(".certificate-card");
  const emptyState = document.querySelector(".empty-certificates");
  const title = document.getElementById("certificate-title");

  if (category === "all") {
    allCards.forEach((card) => {
      card.style.display = "flex";
    });
    if (emptyState) emptyState.style.display = "none";
    if (title) title.textContent = "All Certifications";
  } else {
    let visibleCount = 0;
    allCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");
      if (cardCategory === category) {
        card.style.display = "flex";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    const categoryMap = {
      aws: "AWS Certifications",
      terraform: "Terraform Certifications",
      linux: "Linux Certifications",
      kubernetes: "Kubernetes Certifications",
      security: "Security Certifications",
      programming: "Programming Certifications",
    };
    if (title)
      title.textContent =
        categoryMap[category] ||
        category.charAt(0).toUpperCase() +
          category.slice(1) +
          " Certifications";

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? "flex" : "none";
    }
  }

  // Update active state
  document.querySelectorAll(".certificate-categories li").forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("data-category") === category) {
      item.classList.add("active");
    }
  });
}
