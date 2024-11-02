const track = document.querySelector('.product-track');
const items = Array.from(track.children);
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0; // Vị trí hiện tại
const totalItems = items.length; // Tổng số sản phẩm
let visibleItems = 3; // Số sản phẩm hiển thị cùng một lúc
let gap=5;
if(window.matchMedia("(max-width:1050px)").matches){
    visibleItems=2;
    gap=5.5;
} 
if(window.matchMedia("(max-width:700px)").matches){
    visibleItems=1;
    gap=8.5;
}
// Cập nhật băng chuyền
function updateCarousel() {
    console.log(visibleItems);
    const itemWidth = items[0].getBoundingClientRect().width; // Kích thước của sản phẩm
    const offset = -currentIndex * ((itemWidth+gap*visibleItems) / visibleItems); // Tính toán khoảng cách dịch chuyển
    track.style.transform = `translateX(${offset}px)`; // Áp dụng dịch chuyển
}

// Nhấn nút "tiếp theo"
nextButton.addEventListener('click', () => {
    currentIndex +=visibleItems; // Tăng chỉ số hiện tại
    if (currentIndex >= totalItems+10) {
        currentIndex = 0; // Quay lại sản phẩm đầu tiên
    }
    updateCarousel(); // Cập nhật vị trí
});

// Nhấn nút "trước"
prevButton.addEventListener('click', () => {
    currentIndex -=visibleItems; // Giảm chỉ số hiện tại
    if (currentIndex < 0) {
        currentIndex = totalItems +7; // Nếu nhỏ hơn 0, quay lại sản phẩm cuối cùng
    }
    updateCarousel(); // Cập nhật vị trí
});

// Tự động chuyển đổi mỗi 4 giây
setInterval(() => {
    currentIndex +=visibleItems; // Tăng chỉ số hiện tại
    console.log(currentIndex);
    if (currentIndex >=(visibleItems*(totalItems-visibleItems+1))) {
        currentIndex = 0; // Quay lại sản phẩm đầu tiên
    }
    updateCarousel(); // Cập nhật vị trí
}, 2000);
