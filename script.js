const track = document.querySelector('.product-track');
const items = Array.from(track.children);
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const visibleItems = 3; // Number of items visible at a time
const itemWidth = items[0].getBoundingClientRect().width; // Width of each product item

// Clone the first few items to make the carousel appear endless
for (let i = 0; i < visibleItems; i++) {
    const clone = items[i].cloneNode(true);
    track.appendChild(clone);
}

let currentIndex = 0;

// Update the carousel position
function updateCarousel() {
    const offset = -currentIndex * itemWidth;
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(${offset}px)`;
}

// Move to the next set of items
function next() {
    currentIndex++;
    updateCarousel();

    // Check if we’ve reached the cloned items and reset position for a smooth loop
    if (currentIndex >= items.length) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = 0; // Reset to the first item
            updateCarousel();
        }, 500); // Match the transition duration
    }
}

// Move to the previous set of items
function prev() {
    if (currentIndex === 0) {
        currentIndex = items.length; // Jump to the cloned items at the end for smooth loop
        track.style.transition = 'none';
        updateCarousel();
    }
    setTimeout(() => {
        track.style.transition = 'transform 0.5s ease';
        currentIndex--;
        updateCarousel();
    }, 20); // Small delay to ensure seamless transition
}

// Event listeners for buttons
nextButton.addEventListener('click', next);
prevButton.addEventListener('click', prev);

// Automatic scrolling every 5 seconds
setInterval(next, 5000);
