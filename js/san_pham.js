let cart = [];
document.querySelectorAll('.mon .gia').forEach(span => {
    span.addEventListener('click', function() {
        const mon = this.closest('.mon'); 
        const name = mon.querySelector('h3').innerText; 
        const priceText = this.innerText.replace('.', '').replace(' VNĐ', ''); 
        const price = parseInt(priceText); 
        const imageUrl = mon.querySelector("img").src; 

        addToCart(name, price,imageUrl);
        const notification = document.getElementById('notification');
        notification.textContent = 'Sản phẩm đã được thêm vào giỏ hàng của bạn!';
        notification.style.display = 'block';
        notification.style.opacity = 1; 

        setTimeout(() => {
            notification.style.opacity = 0; 
            setTimeout(() => {
                notification.style.display = 'none'; 
            }, 500); 
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
        if (item.quantity < 1) {
            cart = cart.filter(item => item.name !== name);
        }
        updateCart();
    }
}

function updateCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
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

        total += item.price * item.quantity; 
    });

    document.getElementById('total').innerText = `Tổng: ${total.toLocaleString()} VNĐ`;

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
    cart = cart.filter(item => item.name !== name);
    updateCart(); 
}

window.onload = function () {
    window.scrollTo(0, 0);
};

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
  
      setTimeout(() => {
        notification.style.opacity = 0;
        setTimeout(() => {
          notification.style.display = "none";
        }, 500);
      }, 3000);
    } else {
      localStorage.setItem("cart", JSON.stringify(cart)); 
      window.location.href = "thanh_toan.html"; 
    }
  });

function updateCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = ""; 
  let total = 0;
  let totalItems = 0; 

  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
            ${item.name} - ${item.price.toLocaleString()} VNĐ x 
            <button class="decrease" data-name="${item.name}">-</button>
            <span>${item.quantity}</span>
            <button class="increase" data-name="${item.name}">+</button>
            <button class="remove" data-name="${
              item.name
            }"><i class="fas fa-trash"></i></button>
        `;
    cartDiv.appendChild(itemDiv);

    total += item.price * item.quantity;
    totalItems += item.quantity; 
  });

  document.getElementById("total").innerText = `Tổng: ${total.toLocaleString()} VNĐ`;

  const cartCount = document.getElementById("cart-count");
  if (totalItems > 0) {
    cartCount.innerText = totalItems; 
    cartCount.style.display = "flex"; 
  } else {
    cartCount.style.display = "none"; 
  }

  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      changeQuantity(name, 1);
    });
  });

  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      changeQuantity(name, -1);
    });
  });

  document.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      removeFromCart(name);
    });
  });
}
