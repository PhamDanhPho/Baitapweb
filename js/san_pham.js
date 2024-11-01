let cart = [];

// Thêm sự kiện cho tất cả các giá
document.querySelectorAll('.mon .gia').forEach(span => {
    span.addEventListener('click', function() {
        const mon = this.closest('.mon'); // Lấy thẻ cha
        const name = mon.querySelector('h3').innerText; // Lấy tên món
        const priceText = this.innerText.replace('.', '').replace(' VNĐ', ''); // Xóa ký tự không cần thiết
        const price = parseInt(priceText); // Chuyển đổi thành số
        const imageUrl = mon.querySelector("img").src; // Giả sử bạn có thẻ <img> trong mỗi món ăn

        addToCart(name, price,imageUrl);
        // Thông báo khi thêm món ăn vào giỏ hàng
        const notification = document.getElementById('notification');
        notification.textContent = 'Sản phẩm đã được thêm vào giỏ hàng của bạn!';
        notification.style.display = 'block'; // Hiện thông báo
        notification.style.opacity = 1; // Đặt độ mờ

        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
            notification.style.opacity = 0; // Giảm độ mờ
            setTimeout(() => {
                notification.style.display = 'none'; // Ẩn thông báo
            }, 500); // Thời gian để giảm độ mờ
        }, 3000);
    });
});

function addToCart(name, price, imageUrl) {
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1, image: imageUrl });
    }
    updateCart();
  }

function changeQuantity(name, amount) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += amount;
        // Kiểm tra nếu số lượng nhỏ hơn 1 thì xóa sản phẩm
        if (item.quantity < 1) {
            cart = cart.filter(item => item.name !== name);
        }
        updateCart();
    }
}

function updateCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = ''; // Xóa nội dung cũ
    let total = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            ${item.name} - ${item.price.toLocaleString()} VNĐ x 
            <button class="decrease" data-name="${item.name}">-</button>
            <span>${item.quantity}</span>
            <button class="increase" data-name="${item.name}">+</button>
            <button class="remove" data-name="${item.name}"><i class="fas fa-trash"></i></button>
        `;
        cartDiv.appendChild(itemDiv);

        total += item.price * item.quantity; // Cộng dồn tổng giá
    });

    document.getElementById('total').innerText = `Tổng: ${total.toLocaleString()} VNĐ`;

    // Thêm sự kiện cho các nút tăng giảm
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            changeQuantity(name, 1);
        });
    });

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            changeQuantity(name, -1);
        });
    });
    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            removeFromCart(name);
        });
    });
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name); // Xóa sản phẩm khỏi giỏ hàng
    updateCart(); // Cập nhật lại giỏ hàng
}

// Khi trang được tải lại, cuộn về đầu trang
window.onload = function () {
    window.scrollTo(0, 0);
};

// Hiện/ẩn giỏ hàng
document.getElementById('hiengiohang').addEventListener('click', function() {
    const cart = document.getElementById('giohang');
    if (cart.style.display === 'none' || cart.style.display === '') {
        cart.style.display = 'block';
    } else {
        cart.style.display = 'none';
    }
});
const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li a");

function toggleMenu() {
  navLinks.classList.toggle("active");
}

function removeMenu() {
  navLinks.classList.remove("active");
}

menuIcon.addEventListener("click", toggleMenu());

navItems.forEach((item) => {
  item.addEventListener("click", removeMenu);
});
document.getElementById("thanhtoan").addEventListener("click", function () {
    if (cart.length === 0) {
      const notification = document.getElementById("notification");
      notification.textContent = "Bạn phải chọn ít nhất một sản phẩm mới thanh toán được!";
      notification.style.display = "block";
      notification.style.opacity = 1;
  
      // Ẩn thông báo sau 3 giây
      setTimeout(() => {
        notification.style.opacity = 0;
        setTimeout(() => {
          notification.style.display = "none";
        }, 500);
      }, 3000);
    } else {
      localStorage.setItem("cart", JSON.stringify(cart)); // Lưu giỏ hàng vào localStorage
      window.location.href = "thanh_toan.html"; // Điều hướng sang trang thanh toán
    }
  });
