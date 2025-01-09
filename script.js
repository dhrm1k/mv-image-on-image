// Select elements
const baseInput = document.getElementById('base-image');
const overlayInput = document.getElementById('overlay-image');
const canvas = document.getElementById('canvas');
const saveBtn = document.getElementById('save-btn');
const downloadLink = document.getElementById('download-link');
const ctx = canvas.getContext('2d');

// Variables for images and overlay position
let baseImg = null;
let overlayImg = null;
let overlayX = 100; // Initial position
let overlayY = 100;
let isDragging = false;

// Load base image
baseInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      baseImg = new Image();
      baseImg.onload = drawCanvas;
      baseImg.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

// Load overlay image
overlayInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      overlayImg = new Image();
      overlayImg.onload = drawCanvas;
      overlayImg.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

// Draw the canvas
function drawCanvas() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw base image
  if (baseImg) {
    ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);
  }

  // Draw overlay image
  if (overlayImg) {
    ctx.drawImage(overlayImg, overlayX, overlayY, 100, 100); // Adjust size as needed
  }
}

// Handle dragging
canvas.addEventListener('mousedown', (e) => {
  if (overlayImg) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if the click is inside the overlay image
    if (
      mouseX >= overlayX &&
      mouseX <= overlayX + 100 &&
      mouseY >= overlayY &&
      mouseY <= overlayY + 100
    ) {
      isDragging = true;
    }
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (isDragging && overlayImg) {
    const rect = canvas.getBoundingClientRect();
    overlayX = e.clientX - rect.left - 50; // Center the drag
    overlayY = e.clientY - rect.top - 50;
    drawCanvas();
  }
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
});

// Save the final image
saveBtn.addEventListener('click', () => {
  const finalImage = canvas.toDataURL('image/png');
  downloadLink.href = finalImage;
  downloadLink.download = 'final-image.png';
  downloadLink.style.display = 'block';
  downloadLink.textContent = 'Click here to download your image!';
});
