// script.js 
const images = [ 
'image1.jpg', 
'image2.jpg', 
'image3.jpg', 
'image4.jpg' 
]; 
let currentIndex = 0; 
const sliderImage = document.getElementById('sliderImage'); 
const prevBtn = document.getElementById('prevBtn'); 
const nextBtn = document.getElementById('nextBtn'); 
// Function to update the displayed image 
function updateImage() { 
sliderImage.src = images[currentIndex]; 
} 
// Show the previous image 
prevBtn.addEventListener('click', () => { 
currentIndex = (currentIndex - 1 + images.length) % images.length; 
updateImage(); 
}); 
// Show the next image 
nextBtn.addEventListener('click', () => { 
currentIndex = (currentIndex + 1) % images.length; 
updateImage(); 
}); 
// Auto-slide every 3 seconds 
setInterval(() => { 
currentIndex = (currentIndex + 1) % images.length; 
updateImage(); 
}, 3000);