document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('myAudio');

    // Đưa trình phát nhạc xuống cuối trang nếu cần
    if (audio) {
        document.body.appendChild(audio);
    }
});

// Kích hoạt nhạc khi người dùng tương tác lần đầu
window.addEventListener('click', () => {
    const audio = document.getElementById('myAudio');
    if (audio && audio.muted) {
        audio.muted = false;
        audio.play().catch(err => console.log("Chưa phát được nhạc:", err));
    }
}, { once: true });
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('myAudio');
    const card = document.querySelector('.card');

    // 1. Tự động di chuyển thẻ audio xuống cuối body nếu nó đang nằm ở chỗ khác
    if (audio) {
        document.body.appendChild(audio);
    }






document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById('playBtn'); // Nút 'Trang MMO' của Bo
    const audio = document.getElementById('myAudio');
    
    if (playBtn && audio) {
        playBtn.addEventListener('click', function() {
            if (audio.paused) {
                // Phát nhạc và đảm bảo không bị tắt tiếng
                audio.muted = false; 
                audio.play().then(() => {
                    playBtn.innerHTML = '<span>⏸ Tạm dừng</span>';
                }).catch(err => {
                    console.error("Không thể phát nhạc:", err);
                });
            } else {
                audio.pause();
                playBtn.innerHTML = '<span>🎵 Trang MMO</span>';
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
