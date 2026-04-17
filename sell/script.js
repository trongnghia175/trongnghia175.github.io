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

async function buyProduct(price, link) {
    if (balance >= price) {
        if (confirm("Xác nhận dùng " + price.toLocaleString('vi-VN') + "đ để tải tệp này?")) {
            try {
                // 1. Cố gắng lấy dữ liệu file trước để đảm bảo link tồn tại
                const response = await fetch(link);
                if (!response.ok) throw new Error("Không tìm thấy file");
                
                const blob = await response.blob();
                
                // 2. Trừ tiền sau khi đã xác nhận file tồn tại
                balance -= price;
                updateUI();

                // 3. Tạo URL giả lập từ Blob để ép tải xuống
                const blobUrl = window.URL.createObjectURL(blob);
                const downloadLink = document.createElement('a');
                downloadLink.href = blobUrl;
                
                // Lấy tên file từ đường dẫn
                downloadLink.download = link.split('/').pop();
                
                document.body.appendChild(downloadLink);
                downloadLink.click();
                
                // 4. Dọn dẹp bộ nhớ
                document.body.removeChild(downloadLink);
                window.URL.revokeObjectURL(blobUrl);

                alert("Thanh toán thành công! Tệp đang được tải xuống.");
            } catch (error) {
                alert("Lỗi: Không thể tải file. Vui lòng kiểm tra lại đường dẫn!");
                console.error(error);
            }
        }
    } else {
        alert("Số dư không đủ. Vui lòng liên hệ Admin Bo để nhận code!");
    }
}
