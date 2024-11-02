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
  event.preventDefault(); 
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
  
  window.scrollTo(0, 0);

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
  
  displayOrder(); 

  const discountSection = document.getElementById("discount-code");
  const discountSectionUse = document.getElementById("use-discount-code");
  const line2 = document.getElementById("gach2");
  const iconpay = document.getElementById("icon_pay");
  const pay = document.getElementById("pay");
  const ckint4 = document.getElementById("ck_in4");
  const in4order = document.getElementById("in4order");
  const discountdescrease=document.getElementById("ck_giamgia");

  discountSection.style.display = "none";
  discountSectionUse.style.display = "none"; 
  discountdescrease.style.display="none";

  line2.style.display = "none";
  iconpay.classList.remove("bi-credit-card");
  iconpay.classList.add("bi-check-circle-fill");
  iconpay.style.color = "green";
  pay.innerHTML = "<strong>Đặt hàng thành công!</strong>";
  ckint4.innerHTML = "<p>Pi Thái cảm ơn bạn đã mua hàng!</p>";
  in4order.remove();

  const submitButton = document.getElementById("submit-button"); 
  submitButton.innerHTML = "Tiếp tục mua hàng";
  submitButton.onclick = function () {
    window.location.href = "san_pham.html"; 
  };
}

const bankRadio = document.getElementById("exampleRadios1");
const cashRadio = document.getElementById("exampleRadios2");
const bankInfo = document.querySelector(".bank-info");

bankRadio.addEventListener("change", function () {
  if (bankRadio.checked) {
    bankInfo.style.display = "block"; 
  }
});

cashRadio.addEventListener("change", function () {
  if (cashRadio.checked) {
    bankInfo.style.display = "none"; 
  }
});

const cartData = JSON.parse(localStorage.getItem("cart")) || [];

function displayOrder() {
  const orderContainer = document.querySelector(".donhang div"); 
  orderContainer.innerHTML = ""; 

  let total = 0;
  let subtotal = 0; 
  const shippingFeePerItem = 3000; 

  cartData.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${
      item.name
    }" style="width: 60px; height: auto; margin-right: 10px; margin-bottom: 5px" />
      ${item.name} - ${item.price.toLocaleString()} VNĐ x ${item.quantity}
    `;
    orderContainer.appendChild(itemDiv);

    subtotal += item.price * item.quantity; 
    total += item.price * item.quantity; 
  });

  const shippingFee = cartData.length * shippingFeePerItem;

  total += shippingFee;

  document.querySelector(
    ".tam-tinh"
  ).innerHTML = `<strong>Tạm tính:</strong> ${subtotal.toLocaleString()} VNĐ`;
  document.querySelector(
    ".phi-van-chuyen"
  ).innerHTML = `<strong>Phí vận chuyển:</strong> ${shippingFee.toLocaleString()} VNĐ`;

  const discountcodes=[
    {code: "HIEUBODOI", discount:0.1},
    {code: "PHOCONGAN", discount:0.5},
    {code: "SONDACCHUNG", discount:0.2},
    {code: "DATSIQUAN", discount:0.8},
  ];

  let discountAmount = 0; 
  const discountCodeInput = document.getElementById("discount-code").value; 
  const invaliddiscount=document.getElementById("ck_giamgia");
  
  const validdiscont=discountcodes.find(
    (discount) => discount.code===discountCodeInput
  );

  if (validdiscont){
    discountAmount = total * validdiscont.discount;
  }
  if(validdiscont && check!=1){
    invaliddiscount.innerHTML="Mã giảm giá hợp lệ!";
    invaliddiscount.style.color="green";
  }
  else if(discountCodeInput!==""){
    invaliddiscount.innerHTML="Mã giảm giá không hợp lệ!";
    invaliddiscount.style.color="red";
  }

  document.querySelector(
    ".phi-giam-gia"
  ).innerHTML = `<strong>Phí giảm giá:</strong> - ${discountAmount.toLocaleString()} VNĐ`;

  const totalAfterDiscount = total - discountAmount;
  document.querySelector(
    ".tong-cong"
  ).innerHTML = `<strong>Tổng cộng: ${totalAfterDiscount.toLocaleString()} VNĐ</strong>`;
}

window.onload = displayOrder;
