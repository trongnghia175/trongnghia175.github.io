const CODES = {
 //code ad min
 "BO2109": 105384628,"DTN175": 1000000,"TTKP21": 1000000,
    // 10 ngàn
    "7K2P9X": 10000, "M4N1QZ": 10000, "B9V2RT": 10000, "X5L8WP": 10000, "C3J6YF": 10000,
    // 20 ngàn
    "A1S9D8": 20000, "G4H2J7": 20000, "K5L3M6": 20000, "P0O9I8": 20000, "U7Y6T5": 20000,
    // 30 ngàn
    "R4E3W2": 30000, "Q1A2S3": 30000, "Z9X8C7": 30000, "V6B5N4": 30000, "M1K2J3": 30000,
    // 40 ngàn
    "L4P5O6": 40000, "I7U8Y9": 40000, "T0R1E2": 40000, "W3Q4A5": 40000, "S6D7F8": 40000,
    // 50 ngàn
    "G9H0J1": 50000, "K2L3M4": 50000, "X5C6V7": 50000, "B8N9M0": 50000, "P1Q2W3": 50000,
    // 60 ngàn
    "E4R5T6": 60000, "Y7U8I9": 60000, "O0P1A2": 60000, "S3D4F5": 60000, "G6H7J8": 60000,
    // 70 ngàn
    "K9L0X1": 70000, "C2V3B4": 70000, "N5M6Q7": 70000, "W8E9R0": 70000, "T1Y2U3": 70000,
    // 80 ngàn
    "I4O5P6": 80000, "A7S8D9": 80000, "F0G1H2": 80000, "J3K4L5": 80000, "Z6X7C8": 80000,
    // 90 ngàn
    "V9B0N1": 90000, "M2Q3W4": 90000, "E5R6T7": 90000, "Y8U9I0": 90000, "P1A2S3": 90000,
    // 100 ngàn
    "D4F5G6": 100000, "H7J8K9": 100000, "L0Z1X2": 100000, "C3V4B5": 100000, "N6M7Q8": 100000
};




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
        if (confirm("Xác nhận thanh toán " + price.toLocaleString('vi-VN') + "đ?")) {
            
            // Danh sách các đuôi file muốn tải trực tiếp
            const fileExtensions = ['.apk', '.conf', '.zip', '.rar', '.txt', '.pdf'];
            const isDirectFile = fileExtensions.some(ext => link.toLowerCase().endsWith(ext));

            if (isDirectFile) {
                // TRƯỜNG HỢP 1: TẢI FILE TRỰC TIẾP
                try {
                    const response = await fetch(link);
                    if (!response.ok) throw new Error("Không tìm thấy file");
                    
                    const blob = await response.blob();
                    
                    // Trừ tiền sau khi xác nhận file có tồn tại
                    balance -= price;
                    updateUI();

                    const blobUrl = window.URL.createObjectURL(blob);
                    const downloadLink = document.createElement('a');
                    downloadLink.href = blobUrl;
                    downloadLink.download = link.split('/').pop();
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    window.URL.revokeObjectURL(blobUrl);

                    alert("Thanh toán thành công! Đang tải file...");
                } catch (error) {
                    alert("Lỗi: File không tồn tại hoặc lỗi đường dẫn!");
                    console.error(error);
                }
            } else {
                // TRƯỜNG HỢP 2: DẪN ĐẾN LINK NGOÀI (Google Drive, v.v.)
                balance -= price;
                updateUI();
                
                alert("Thanh toán thành công! Đang chuyển hướng đến liên kết...");
                window.open(link, '_blank');
            }
        }
    } else {
        alert("Số dư không đủ. Vui lòng liên hệ Admin để nhận mã!");
    }
}
