const track = document.querySelector('.product-track');
const items = Array.from(track.children);
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0; // Vị trí hiện tại
const totalItems = items.length; // Tổng số sản phẩm
const visibleItems = 3; // Số sản phẩm hiển thị cùng một lúc

// Cập nhật băng chuyền
function updateCarousel() {
    const itemWidth = items[0].getBoundingClientRect().width; // Kích thước của sản phẩm
    const offset = -currentIndex * (itemWidth / visibleItems); // Tính toán khoảng cách dịch chuyển
    track.style.transform = `translateX(${offset}px)`; // Áp dụng dịch chuyển
}

// Nhấn nút "tiếp theo"
nextButton.addEventListener('click', () => {
    currentIndex += visibleItems; // Tăng chỉ số hiện tại
    if (currentIndex >= totalItems) {
        currentIndex = 0; // Quay lại sản phẩm đầu tiên
    }
    updateCarousel(); // Cập nhật vị trí
});

// Nhấn nút "trước"
prevButton.addEventListener('click', () => {
    currentIndex -= visibleItems; // Giảm chỉ số hiện tại
    if (currentIndex < 0) {
        currentIndex = totalItems - visibleItems; // Nếu nhỏ hơn 0, quay lại sản phẩm cuối cùng
    }
    updateCarousel(); // Cập nhật vị trí
});

// Tự động chuyển đổi mỗi 5 giây
setInterval(() => {
    currentIndex += visibleItems; // Tăng chỉ số hiện tại
    if (currentIndex >= totalItems) {
        currentIndex = 0; // Quay lại sản phẩm đầu tiên
    }
    updateCarousel(); // Cập nhật vị trí
}, 3000);
