// ==========================================
// 1. 黑膠唱片與多首歌曲切換邏輯
// ==========================================

// 🎵 你的專屬歌單：把兩首歌的網址貼在引號裡面！
const playlist = [
    "https://github.com/DJadeee/to-kiko/raw/refs/heads/main/because-of-you.mp3",
    "https://github.com/DJadeee/to-kiko/raw/refs/heads/main/night-changes.mp3"
];

// 紀錄目前播到第幾首 (0代表第一首, 1代表第二首)
let currentTrackIndex = 0;

// 初始化：網頁載入時先設定好第一首歌的網址
document.addEventListener("DOMContentLoaded", function() {
    const source = document.getElementById('musicSource');
    if(source) {
        source.src = playlist[0];
    }
});

// [播放/暫停] 主控函式
function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const record = document.getElementById('vinylRecord');
    
    if (!audio || !record) return;

    if (audio.paused) {
        audio.play().then(() => {
            record.classList.add('playing');
        }).catch((error) => {
            console.log("播放被阻擋:", error);
        });
    } else {
        audio.pause();
        record.classList.remove('playing');
    }
}

// [下一首] 切換函式
function nextSong() {
    const audio = document.getElementById('bgMusic');
    const source = document.getElementById('musicSource');
    const record = document.getElementById('vinylRecord');
    
    // 計算下一首的順序 (如果到底了就回到第 0 首)
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    
    // 換上新歌的網址
    source.src = playlist[currentTrackIndex];
    
    // 重新載入音檔並播放
    audio.load();
    audio.play().then(() => {
        record.classList.add('playing');
    }).catch(error => {
        console.log("切換播放被阻擋:", error);
    });
}

// ==========================================
// 2. 網頁載入後執行的核心互動功能
// ==========================================
$(function() {
    
    // 【A. 回到頂端按鈕：點擊事件】
    $('#BackTop').click(function(){
        // 0.33秒 (333ms) 極其滑順地滾動回最頂端
        $('html, body').animate({ scrollTop: 0 }, 333); 
        return false;
    });
    
    // 【B. 回到頂端按鈕：滾動顯隱判定】
    $(window).scroll(function() {
        // 劃過第一區塊 (超過 300px) 時優雅淡入，回到頂部時自動淡出隱藏
        if ($(this).scrollTop() > 300) {
            $('#BackTop').fadeIn(222); 
        } else {
            $('#BackTop').stop().fadeOut(222); 
        }
    }).scroll(); 

    // 【C. 音樂唯一的循環監聽機制】
    const audio = document.getElementById('bgMusic');
    if (audio) {
        audio.removeAttribute('loop'); 
        audio.addEventListener('ended', function() {
            audio.currentTime = 0; 
            audio.play().catch(err => console.log("循環播放被阻擋:", err));
        });
    }

    // 【D. 照片點擊放大連動邏輯】
    $('.pop-img').on('click', function() {
        var imageSrc = $(this).attr('src'); 
        $('#modalImage').attr('src', imageSrc); 
        $('#imageModal').modal('show'); 
    });

    // 【E. 在一起天數計算器 (已修正天數誤差)】
    (function calculateDays() {
        const startDateStr = '2025-07-13';
        
        // 1. 設定開始日期，並強制將時間歸零為午夜 00:00:00
        const startDate = new Date(startDateStr); 
        startDate.setHours(0, 0, 0, 0);
        
        // 2. 取得今天日期，同樣強制歸零為午夜 00:00:00
        const today = new Date(); 
        today.setHours(0, 0, 0, 0);
        
        // 3. 計算時間差 (毫秒)
        const diffTime = today - startDate; 
        
        // 4. 將毫秒換算為天數，並在最後 + 1 (把交往的第一天當作第 1 天)
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        // 5. 顯示結果
        if (today < startDate) {
            $('#days-counter').text('0');
        } else {
            $('#days-counter').text(diffDays);
        }
    })();

}); // <-- 剛剛就是不小心刪到這個非常重要的結尾括號啦！

// ==========================================
// 3. 浪漫特效：全畫面自動生成漂浮粉紅泡泡 🫧
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const bubbleContainer = document.createElement('div');
    bubbleContainer.style.position = 'fixed';
    bubbleContainer.style.top = '0';
    bubbleContainer.style.left = '0';
    bubbleContainer.style.width = '100vw';
    bubbleContainer.style.height = '100vh';
    bubbleContainer.style.pointerEvents = 'none'; 
    bubbleContainer.style.zIndex = '1';          
    bubbleContainer.style.overflow = 'hidden';
    document.body.appendChild(bubbleContainer);

    setInterval(() => {
        const bubble = document.createElement('div');
        const size = Math.random() * 25 + 10; 
        
        bubble.style.position = 'absolute';
        bubble.style.bottom = '-50px';
        bubble.style.left = Math.random() * 100 + 'vw'; 
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.borderRadius = '50%';
        
        bubble.style.background = 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 182, 193, 0.4) 40%, rgba(255, 107, 129, 0.1) 80%)';
        bubble.style.boxShadow = 'inset -2px -2px 6px rgba(255, 107, 129, 0.2), 0 4px 10px rgba(0, 0, 0, 0.03)';
        bubble.style.opacity = Math.random() * 0.5 + 0.4;
        
        const speed = Math.random() * 4 + 5; 
        bubble.style.transition = `transform ${speed}s linear, opacity ${speed}s ease-out`;
        
        bubbleContainer.appendChild(bubble);

        setTimeout(() => {
            const drift = Math.random() * 80 - 40; 
            bubble.style.transform = `translateY(-110vh) translateX(${drift}px)`;
            bubble.style.opacity = '0'; 
        }, 50);

        setTimeout(() => { bubble.remove(); }, speed * 1000);
    }, 600);
});