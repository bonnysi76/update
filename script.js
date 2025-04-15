// Hamburger Menu Toggle
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Initialize Typed.js for typewriter effect in the profile section
const typed = new Typed("#typed", {
  strings: ["Software Developer", "Security and Network Engineer"],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true,
});

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
});

// Custom Cursor Movement
const cursor = document.querySelector(".custom-cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// GSAP Hover Effects for Project Cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, { scale: 1.05, ease: "power1.out", duration: 0.3 });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { scale: 1, ease: "power1.out", duration: 0.3 });
  });
});

// ========== THEME TOGGLE FUNCTIONALITY ========== //
const body = document.body;
const themeToggle = document.getElementById("themeToggle");

// Define themes and icons
const themes = ["white-theme", "dark-theme", "blue-black-theme"];
const icons = ["🌞", "🌙", "💻"];

// Load saved theme from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  let savedTheme = localStorage.getItem("theme");
  let index = themes.indexOf(savedTheme);
  if (index === -1) {
    index = 0; // default to white-theme
    savedTheme = themes[index];
  }
  body.classList.add(savedTheme);
  themeToggle.innerText = icons[index];
});

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  const currentTheme = themes.find((t) => body.classList.contains(t));
  let newIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
  
  // Remove existing theme classes
  themes.forEach((t) => body.classList.remove(t));
  
  // Set new theme
  const newTheme = themes[newIndex];
  body.classList.add(newTheme);
  themeToggle.innerText = icons[newIndex];
  localStorage.setItem("theme", newTheme);
});

// ========== CERTIFICATE UPLOAD PREVIEW ========== //
const certificateInput = document.getElementById("certificateUpload");
const certificatePreview = document.getElementById("certificatePreview");

certificateInput.addEventListener("change", (e) => {
  const files = Array.from(e.target.files);
  certificatePreview.innerHTML = ""; // Clear previous previews
  files.forEach((file) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const fileURL = event.target.result;
      const previewItem = document.createElement("div");
      previewItem.classList.add("certificate-item");
      
      // If image, display it; if PDF or others, display file name
      if(file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = fileURL;
        img.alt = file.name;
        img.classList.add("certificate-img");
        previewItem.appendChild(img);
      } else {
        previewItem.innerText = file.name;
      }
      certificatePreview.appendChild(previewItem);
    }
    fileReader.readAsDataURL(file);
  });
});
