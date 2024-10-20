document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Lấy giá trị từ form
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Lấy thông tin người dùng từ localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Kiểm tra xem thông tin người dùng có khớp không
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        // Chuyển hướng tới trang index.html hoặc trang chủ
        window.location.href = "../index.html";
    } else {
        // Đăng nhập thất bại
        document.getElementById("loginMessage").textContent = "Invalid email or password.";
    }
});