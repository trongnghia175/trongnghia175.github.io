document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. NÚT THEO DÕI ---
    const followBtn = document.getElementById('followBtn');
    if (followBtn) {
        let isFollowed = localStorage.getItem('isFollowed') === 'true';
        const updateFollowUI = (status) => {
            followBtn.innerHTML = status ? '<i class="fas fa-check"></i> Đã theo dõi' : '<i class="fas fa-user-plus"></i> Theo dõi';
            followBtn.classList.toggle('followed', status);
        };
        updateFollowUI(isFollowed);
        followBtn.onclick = () => {
            isFollowed = !isFollowed;
            localStorage.setItem('isFollowed', isFollowed);
            updateFollowUI(isFollowed);
        };
    }

    // --- 2. XỬ LÝ TẤT CẢ BÀI VIẾT (LIKE & XEM THÊM) ---
    const posts = document.querySelectorAll('.post-card');
    posts.forEach(post => {
        const postId = post.getAttribute('data-post-id');
        if (!postId) return;

        // Xử lý Xem thêm / Rút gọn
        const readMoreBtn = post.querySelector('.read-more-btn');
        const moreText = post.querySelector('.more-text');
        
        if (readMoreBtn && moreText) {
            readMoreBtn.onclick = () => {
                if (moreText.style.display === "none" || moreText.style.display === "") {
                    moreText.style.display = "inline";
                    readMoreBtn.innerText = " Rút gọn";
                } else {
                    moreText.style.display = "none";
                    readMoreBtn.innerText = "... Xem thêm";
                }
            };
        }

        // Xử lý Like/Dislike (Lấy số từ HTML)
        const likeBtn = post.querySelector('.like-btn');
        const dislikeBtn = post.querySelector('.dislike-btn');
        const lCount = likeBtn.querySelector('.count');
        const dCount = dislikeBtn.querySelector('.count');

        const startLikes = parseInt(lCount.innerText);
        const startDislikes = parseInt(dCount.innerText);

        let likes = localStorage.getItem(`${postId}_l`) !== null ? parseInt(localStorage.getItem(`${postId}_l`)) : startLikes;
        let dislikes = localStorage.getItem(`${postId}_d`) !== null ? parseInt(localStorage.getItem(`${postId}_d`)) : startDislikes;
        let choice = localStorage.getItem(`${postId}_c`);

        const updateUI = () => {
            lCount.innerText = likes;
            dCount.innerText = dislikes;
            likeBtn.classList.toggle('active', choice === 'like');
            dislikeBtn.classList.toggle('active', choice === 'dislike');
            likeBtn.querySelector('i').className = choice === 'like' ? 'fas fa-thumbs-up' : 'far fa-thumbs-up';
            dislikeBtn.querySelector('i').className = choice === 'dislike' ? 'fas fa-thumbs-down' : 'far fa-thumbs-down';
        };

        const vote = (type) => {
            if (choice === type) {
                type === 'like' ? likes-- : dislikes--;
                choice = null;
            } else {
                if (choice === 'like') likes--;
                if (choice === 'dislike') dislikes--;
                type === 'like' ? likes++ : dislikes++;
                choice = type;
            }
            localStorage.setItem(`${postId}_l`, likes);
            localStorage.setItem(`${postId}_d`, dislikes);
            localStorage.setItem(`${postId}_c`, choice || '');
            updateUI();
        };

        updateUI();
        likeBtn.onclick = () => vote('like');
        dislikeBtn.onclick = () => vote('dislike');
    });
});
