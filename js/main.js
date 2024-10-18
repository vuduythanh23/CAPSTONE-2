// Thêm sản phẩm vào giỏ hàng
function addToCart(name, image, price) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    let existingItem = cartItems.find(item => item.name === name);

    if (existingItem) {
        // Nếu sản phẩm đã có, tăng số lượng
        existingItem.quantity += 1;
    } else {
        // Nếu sản phẩm chưa có, thêm sản phẩm mới
        cartItems.push({
            name: name,
            image: image,
            price: price,
            quantity: 1
        });
    }

    // Cập nhật giỏ hàng trong localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    alert(`${name} has been added to the cart`);
}