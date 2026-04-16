const CODES = { "BO2026": 500000, "GOLD88": 100000, "VIP999": 1000000 };

let balance = parseInt(localStorage.getItem('nt_responsive_balance')) || 0;
updateUI();

function updateUI() {
    document.getElementById('user-balance').innerText = balance.toLocaleString('vi-VN');
    localStorage.setItem('nt_responsive_balance', balance);
}

function handleRecharge() {
    const code = document.getElementById('recharge-code').value.trim().toUpperCase();
    const status = document.getElementById('msg-status');

    if (CODES[code]) {
        balance += CODES[code];
        delete CODES[code];
        status.style.color = "#2ecc71";
        status.innerText = "Nạp thành công!";
        updateUI();
    } else {
        status.style.color = "#da2c1c";
        status.innerText = "Mã không hợp lệ.";
    }
}

function buyProduct(price, link) {
    if (balance >= price) {
        if(confirm("Xác nhận mua hàng?")) {
            balance -= price;
            updateUI();
            alert("Thành công! Đang chuyển hướng...");
            window.location.href = link;
        }
    } else {
        alert("Số dư không đủ. Vui lòng liên hệ Admin Bo để nhận code!");
    }
}
