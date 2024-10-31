var ck_name = /^[\p{L}\s]{3,30}$/u;
var ck_email =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
var ck_phone = /^0[1-9]\d{8}$/;
var check=0
function checknull(txt) {
  if (txt.value.length == 0) {
    return true;
  } else return false;
}

function StringMatch(txt, reg) {
  return reg.test(txt.value);
}

function notCheck(radio) {
  let rt = true;
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) rt = false;
  }
  return rt;
}

function validform(event) {
  event.preventDefault(); // Ngăn form submit
  document.getElementById("ck_giamgia").innerHTML = "";
  if (checknull(frmin4.hoten)) {
    document.getElementById("ck_hoten").innerHTML = "Vui lòng điền họ và tên!";
    frmin4.hoten.focus();
    return;
  } else if (!StringMatch(frmin4.hoten, ck_name)) {
    document.getElementById("ck_hoten").innerHTML =
      "Vui lòng nhập họ và tên đúng định dạng!";
    frmin4.hoten.value = "";
    frmin4.hoten.focus();
    return;
  } else {
    document.getElementById("ck_hoten").innerHTML = "";
  }

  if (checknull(frmin4.email)) {
    document.getElementById("ck_email").innerHTML =
      "Vui lòng điền địa chỉ email!";
    frmin4.email.focus();
    return;
  } else if (!StringMatch(frmin4.email, ck_email)) {
    document.getElementById("ck_email").innerHTML =
      "Vui lòng nhập email đúng định dạng!";
    frmin4.email.value = "";
    frmin4.email.focus();
    return;
  } else {
    document.getElementById("ck_email").innerHTML = "";
  }

  if (checknull(frmin4.sdt)) {
    document.getElementById("ck_sdt").innerHTML =
      "Vui lòng điền số điện thoại!";
    frmin4.sdt.focus();
    return;
  } else if (!StringMatch(frmin4.sdt, ck_phone)) {
    document.getElementById("ck_sdt").innerHTML =
      "Vui lòng nhập số điện thoại đúng định dạng!";
    frmin4.sdt.value = "";
    frmin4.sdt.focus();
    return;
  } else {
    document.getElementById("ck_sdt").innerHTML = "";
  }

  if (checknull(frmin4.diachi)) {
    document.getElementById("ck_diachi").innerHTML = "Vui lòng điền địa chỉ!";
    frmin4.diachi.focus();
    return;
  } else {
    document.getElementById("ck_diachi").innerHTML = "";
  }

  if (checknull(frmin4.province)) {
    document.getElementById("ck_province").innerHTML =
      "Vui lòng điền Tỉnh/Thành phố!";
    frmin4.province.focus();
    return;
  } else {
    document.getElementById("ck_province").innerHTML = "";
  }

  if (checknull(frmin4.district)) {
    document.getElementById("ck_district").innerHTML =
      "Vui lòng điền Quận/Huyện!";
    frmin4.district.focus();
    return;
  } else {
    document.getElementById("ck_district").innerHTML = "";
  }

  if (checknull(frmin4.ward)) {
    document.getElementById("ck_ward").innerHTML = "Vui lòng điền Phường/Xã!";
    frmin4.ward.focus();
    return;
  } else {
    document.getElementById("ck_ward").innerHTML = "";
  }

  if (notCheck(frmin4.thanhtoan)) {
    document.getElementById("ck_thanhtoan").innerHTML =
      "Vui lòng chọn phương thức thanh toán!";
    document.getElementById("exampleRadios1").focus();
    return;
  } else {
    document.getElementById("ck_thanhtoan").innerHTML = "";
  }

  if (!frmin4.tick.checked) {
    document.getElementById("ck_tick").innerHTML =
      "Vui lòng tick chọn để có thể đặt hàng!";
    document.getElementById("invalidCheck3").focus();
    return;
  } else {
    document.getElementById("ck_tick").innerHTML = "";
  }

  alert("Đặt hàng thành công!");

  // Cuộn lên đầu trang
  window.scrollTo(0, 0);

  // Hiển thị thông tin khách hàng
  const thongtin = `
  <h3>Thông tin đơn hàng</h3>
  <p>Mã đơn hàng: <strong>#10003</strong></p>
  <p><strong>Thông tin giao hàng</strong></p>
  <p>Họ và tên: ${frmin4.hoten.value}</p>
  <p>Số điện thoại: ${frmin4.sdt.value}</p>
  <p>Email: ${frmin4.email.value}</p>
  <p>Khu vực: ${frmin4.ward.value}, ${frmin4.district.value}, ${
    frmin4.province.value
  }</p>
  <p>Địa chỉ: ${frmin4.diachi.value}</p>
  <p><strong>Phương thức thanh toán</strong></p>
  <p>${
    frmin4.thanhtoan.value === "option2"
      ? "Thanh toán khi nhận hàng"
      : "Chuyển khoản ngân hàng"
  }</p>
  `;
  document.querySelector(".ketqua").innerHTML = thongtin;
  document.querySelector(".in4cus").style.display = "none";
  document.querySelector(".ketqua").style.display = "block";
  check=1;
  // Hiển thị đơn hàng
  displayOrder(); // Gọi hàm để hiển thị thông tin đơn hàng

  // Xóa phần mã giảm giá
  const discountSection = document.getElementById("discount-code");
  const discountSectionUse = document.getElementById("use-discount-code");
  const line2 = document.getElementById("gach2");
  const iconpay = document.getElementById("icon_pay");
  const pay = document.getElementById("pay");
  const ckint4 = document.getElementById("ck_in4");
  const in4order = document.getElementById("in4order");
  const discountdescrease=document.getElementById("ck_giamgia");

  discountSection.style.display = "none"; // Ẩn phần nhập mã giảm giá
  discountSectionUse.style.display = "none"; // ẩn phần áp dụng mã
  discountdescrease.style.display="none";

  line2.style.display = "none";
  iconpay.classList.remove("bi-credit-card");
  iconpay.classList.add("bi-check-circle-fill");
  iconpay.style.color = "green";
  pay.innerHTML = "<strong>Đặt hàng thành công!</strong>";
  ckint4.innerHTML = "<p>Pi Thái cảm ơn bạn đã mua hàng!</p>";
  in4order.remove();

  // Thay đổi nút thành "Quay về trang sản phẩm"
  const submitButton = document.getElementById("submit-button"); // Giả sử nút có id là "submit-button"
  submitButton.innerHTML = "Tiếp tục mua hàng";
  submitButton.onclick = function () {
    window.location.href = "san_pham.html"; // Đường dẫn trang sản phẩm
  };
}

// Lắng nghe sự kiện thay đổi của các radio button
const bankRadio = document.getElementById("exampleRadios1");
const cashRadio = document.getElementById("exampleRadios2");
const bankInfo = document.querySelector(".bank-info");

bankRadio.addEventListener("change", function () {
  if (bankRadio.checked) {
    bankInfo.style.display = "block"; // Hiển thị thông tin tài khoản
  }
});

cashRadio.addEventListener("change", function () {
  if (cashRadio.checked) {
    bankInfo.style.display = "none"; // Ẩn thông tin tài khoản
  }
});

// Lấy giỏ hàng từ localStorage
const cartData = JSON.parse(localStorage.getItem("cart")) || [];

// Hiển thị đơn hàng trong phần .donhang
function displayOrder() {
  const orderContainer = document.querySelector(".donhang div"); // Lấy phần chứa đơn hàng
  orderContainer.innerHTML = ""; // Xóa nội dung cũ nếu có

  let total = 0;
  let subtotal = 0; // Tạm tính
  const shippingFeePerItem = 3000; // Phí vận chuyển cho mỗi món

  cartData.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${
      item.name
    }" style="width: 60px; height: auto; margin-right: 10px; margin-bottom: 5px" />
      ${item.name} - ${item.price.toLocaleString()} VNĐ x ${item.quantity}
    `;
    orderContainer.appendChild(itemDiv);

    subtotal += item.price * item.quantity; // Cộng dồn giá món
    total += item.price * item.quantity; // Tổng cộng với phí vận chuyển
  });

  // Tính phí vận chuyển
  const shippingFee = cartData.length * shippingFeePerItem;

  // Tổng tiền sau khi cộng phí vận chuyển
  total += shippingFee;

  // Cập nhật tạm tính và phí vận chuyển
  document.querySelector(
    ".tam-tinh"
  ).innerHTML = `<strong>Tạm tính:</strong> ${subtotal.toLocaleString()} VNĐ`;
  document.querySelector(
    ".phi-van-chuyen"
  ).innerHTML = `<strong>Phí vận chuyển:</strong> ${shippingFee.toLocaleString()} VNĐ`;

  // Định nghĩa các mã giảm giá
  const discountcodes=[
    {code: "HIEUCACCAC", discount:0.5},
    {code: "PHOBUOIBUOI", discount:0.5},
    {code: "SONBUABUA", discount:0.5},
    {code: "DATDANGCAP", discount:1},
    {code: "EMANHPHO", discount:0.1},
  ];

  // Tính phí giảm giá
  let discountAmount = 0; // Mặc định không có giảm giá
  const discountCodeInput = document.getElementById("discount-code").value; // Giả sử có một input để nhập mã giảm giá
  const invaliddiscount=document.getElementById("ck_giamgia");
  // Check mã giảm giá hợp lệ
  const validdiscont=discountcodes.find(
    (discount) => discount.code===discountCodeInput
  );

  if (validdiscont){
    discountAmount = total * validdiscont.discount;
  }
  if(validdiscont && check!=1) {
    invaliddiscount.innerHTML = "Mã giảm giá hợp lệ!";
    invaliddiscount.style.color = "green";
}
  else if(discountCodeInput!==""){
    invaliddiscount.innerHTML="Mã giảm giá không hợp lệ!";
  }

  // Cập nhật phí giảm giá
  document.querySelector(
    ".phi-giam-gia"
  ).innerHTML = `<strong>Phí giảm giá:</strong> - ${discountAmount.toLocaleString()} VNĐ`;

  // Tính tổng cộng sau giảm giá
  const totalAfterDiscount = total - discountAmount;
  document.querySelector(
    ".tong-cong"
  ).innerHTML = `<strong>Tổng cộng: ${totalAfterDiscount.toLocaleString()} VNĐ</strong>`;
}

// Gọi hàm hiển thị đơn hàng khi trang tải
window.onload = displayOrder;
