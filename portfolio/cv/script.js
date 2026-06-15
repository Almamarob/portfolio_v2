// CV Script - Handles PDF generation and TOC navigation

document.addEventListener("DOMContentLoaded", function () {
  // Ensure external links open in new tabs
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    if (link.hostname !== window.location.hostname && link.hostname !== "") {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });

  // Handle TOC navigation
  initializeTOC();
});

// Initialize Table of Contents
function initializeTOC() {
  const tocLinks = document.querySelectorAll(".cv-toc-link");
  const sections = document.querySelectorAll("section[id]");

  // Smooth scroll for TOC links
  tocLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update active state
        tocLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Highlight active section on scroll
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "-20% 0px -70% 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        tocLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Generate PDF using Puppeteer backend
function generatePuppeteerPDF() {
  const button = document.getElementById("btnPuppeteer");
  const originalText = button.textContent;

  button.textContent = "Loading...";
  button.disabled = true;

  // Get phone number from editable field
  const phoneField = document.querySelector(".editable-field");
  const phoneNumber = phoneField ? phoneField.textContent.trim() : "";

  // Generate filename with year and month
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const filename = `Alessandra_Margherito_CV_${year}${month}.pdf`;

  fetch("/generate-pdf/cv", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber: phoneNumber }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }
      return response.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      button.textContent = originalText;
      button.disabled = false;
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");

      button.textContent = originalText;
      button.disabled = false;
    });
}
