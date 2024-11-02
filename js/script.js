const track = document.querySelector('.product-track');
const items = Array.from(track.children);
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0; 
const totalItems = items.length; 
let visibleItems = 3; 
let gap=5;
if(window.matchMedia("(max-width:1050px)").matches){
    visibleItems=2;
    gap=5.5;
} 
if(window.matchMedia("(max-width:700px)").matches){
    visibleItems=1;
    gap=8.5;
}

function updateCarousel() {
    console.log(visibleItems);
    const itemWidth = items[0].getBoundingClientRect().width; 
    const offset = -currentIndex * ((itemWidth+gap*visibleItems) / visibleItems); 
    track.style.transform = `translateX(${offset}px)`; 
}

nextButton.addEventListener('click', () => {
    currentIndex +=visibleItems; 
    if (currentIndex >= totalItems+10) {
        currentIndex = 0; 
    }
    updateCarousel(); 
});

prevButton.addEventListener('click', () => {
    currentIndex -=visibleItems; 
    if (currentIndex < 0) {
        currentIndex = totalItems +7; 
    }
    updateCarousel();
});

setInterval(() => {
    currentIndex +=visibleItems; 
    console.log(currentIndex);
    if (currentIndex >=(visibleItems*(totalItems-visibleItems+1))) {
        currentIndex = 0; 
    }
    updateCarousel(); 
}, 3000);
