// Lấy dữ liệu từ localStorage
function loadCart() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let cartBody = document.getElementById('cart-body');

    // Xóa nội dung cũ
    cartBody.innerHTML = '';

    // Lặp qua từng sản phẩm trong giỏ hàng và hiển thị
    cartItems.forEach((item, index) => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td><input type="checkbox" class="form-check-input" checked></td>
            <td>${index + 1}</td>
            <td><img src="${item.image}" alt="${item.name}" style="width: 50px;"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <button class="btn btn-primary btn-sm">+</button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-primary btn-sm">-</button>
            </td>
            <td>${item.price * item.quantity}</td>
            <td>
                <button class="btn btn-danger btn-sm">Delete</button>
            </td>
        `;

        cartBody.appendChild(row);
    });
}

// Gọi hàm khi trang được load
loadCart();