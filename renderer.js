// --- PART 1: Find which project to display ---

// Get the full URL
const urlParams = new URLSearchParams(window.location.search);
// Get the 'id' from the URL (e.g., "?id=handsketches")
const projectId = urlParams.get("id");

// Find the project object in our `projectsData` array that matches the ID
const project = projectsData.find((p) => p.id === projectId);

// --- PART 2: Render the page if a project was found ---

if (project) {
  // Set the document title
  document.title = `${project.title} | Said Behzadmanesh`;

  // --- Render the Header ---
  const headerContainer = document.getElementById("project-header");
  headerContainer.innerHTML = `
        <h1>${project.title}</h1>
        <p class="project-subtitle">${project.subtitle}</p>
    `;

  // --- Render the Slideshow (using a for-loop!) ---
  const slideshowContainer = document.getElementById("slideshow-container");
  let slidesHTML = "";

  // Loop through the images array for the current project
  for (const imagePath of project.images) {
    slidesHTML += `
            <div class="mySlides fade">
                <img src="${imagePath}" alt="${project.title} image">
            </div>
        `;
  }
  // Inject the generated slides and keep the nav buttons
  slideshowContainer.innerHTML = slidesHTML + slideshowContainer.innerHTML;

  // --- Render the Description ---
  const descriptionContainer = document.getElementById("description-content");
  // Build the tools list using a loop and .map()
  const toolsList = project.tools.map((tool) => `<li>${tool}</li>`).join("");

  descriptionContainer.innerHTML = `
        <h2>Project Details</h2>
        ${project.description}
        <h3>Tools Used:</h3>
        <ul>
            ${toolsList}
        </ul>
    `;

  // --- PART 3: Slideshow functionality ---
  let slideIndex = 1;
  showSlides(slideIndex);

  // Make the functions globally accessible for the onclick attributes
  window.plusSlides = function (n) {
    showSlides((slideIndex += n));
  };

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (slides.length === 0) return; // Don't run if no slides
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
  }
} else {
  // --- PART 4: Handle case where project is not found ---
  const projectDetailWrapper = document.querySelector(
    ".project-detail-wrapper"
  );
  projectDetailWrapper.innerHTML = `
        <div style="text-align: center; padding: 5rem;">
            <h1>Project Not Found</h1>
            <p>Sorry, we couldn't find the project you were looking for.</p>
            <a href="index.html" class="back-link" style="color: var(--primary-color);">Return to Portfolio</a>
        </div>
    `;
}

// --- PART 5: Add Keyboard Arrow Navigation for Slideshow ---

// This function will be called whenever a key is pressed
function handleKeyPress(event) {
  // Check if the pressed key is the Left Arrow
  if (event.key === "ArrowLeft") {
    plusSlides(-1); // Go to the previous slide
  }
  // Check if the pressed key is the Right Arrow
  else if (event.key === "ArrowRight") {
    plusSlides(1); // Go to the next slide
  }
}

// Add the event listener to the whole document
// This will only run if we are on a project page (because 'project' will be defined)
if (project) {
  document.addEventListener("keydown", handleKeyPress);
}
