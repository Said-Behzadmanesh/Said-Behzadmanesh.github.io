// --- PREVENT IMAGE DOWNLOAD (Right-click disable) ---
// This will run on any page that loads this script.
document.addEventListener("contextmenu", (event) => {
  // We check if the thing that was right-clicked is an image tag.
  if (event.target.tagName === "IMG") {
    // If it is, we prevent the default browser menu from appearing.
    event.preventDefault();
  }
});
