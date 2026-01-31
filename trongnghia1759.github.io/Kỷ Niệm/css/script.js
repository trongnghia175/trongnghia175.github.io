// Đợi cho HTML load xong rồi mới chạy code
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const overlayImg = document.getElementById('overlay-img');
    const closeBtn = document.getElementById('close-btn');
    const images = document.querySelectorAll('.clickable-img');

    // Lặp qua từng ảnh và thêm sự kiện click
    images.forEach(img => {
        img.addEventListener('click', () => {
            overlay.style.display = 'flex';
            overlayImg.src = img.src; // Lấy nguồn ảnh từ ảnh nhỏ gán vào ảnh to
        });
    });

    // Đóng khi bấm nút X
    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    // Đóng khi bấm ra ngoài vùng ảnh
    overlay.addEventListener('click', (e) => {
        if (e.target !== overlayImg) {
            overlay.style.display = 'none';
        }
    });
});


// Hàm để đóng/mở menu
function toggleMenu() {
    const menu = document.getElementById("navMenu");
    const hamburger = document.querySelector(".hamburger");
    
    if (menu && hamburger) {
        menu.classList.toggle("show");      // Hiển thị/ẩn menu
        hamburger.classList.toggle("change"); // Hiệu ứng xoay dấu X
    }
}

// Đóng menu khi người dùng bấm ra ngoài vùng menu
window.onclick = function(event) {
    const menu = document.getElementById("navMenu");
    const hamburger = document.querySelector(".hamburger");
    const isClickInsideMenu = menu && menu.contains(event.target);
    const isClickOnHamburger = hamburger && hamburger.contains(event.target);

    if (menu && menu.classList.contains('show') && !isClickInsideMenu && !isClickOnHamburger) {
        menu.classList.remove('show');
        hamburger.classList.remove('change');
    }
}







document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('myAudio');
    const playBtn = document.getElementById('playBtn');

    if (playBtn && audio) {
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playBtn.textContent = 'PAUSE'; // Đổi chữ trên nút
            } else {
                audio.pause();
                playBtn.textContent = 'PLAY';
            }
        });
    }
});
// Đoạn mã điều khiển nhạc mới của Bo
(function() {
    const musicBtn = document.getElementById('bo-btn-toggle');
    const musicFile = document.getElementById('bo-audio-player');

    if (musicBtn && musicFile) {
        musicBtn.addEventListener('click', function() {
            if (musicFile.paused) {
                musicFile.play()
                    .then(() => {
                        musicBtn.textContent = '⏸ TẠM DỪNG';
                        musicBtn.classList.add('bo-btn-playing');
                    })
                    .catch(err => {
                        alert('Bo ơi, trình duyệt đang chặn nhạc hoặc sai file rồi!');
                        console.error(err);
                    });
            } else {
                musicFile.pause();
                musicBtn.textContent = '▶️ TIẾP TỤC PHÁT';
                musicBtn.classList.remove('bo-btn-playing');
            }
        });
    }
})();
