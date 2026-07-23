const categories = document.querySelectorAll(".certificate-categories li");

const title = document.getElementById("certificate-title");


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

    subtitle.textContent =
      count + (count === "1" ? " Certificate" : " Certificates");
  });
});
