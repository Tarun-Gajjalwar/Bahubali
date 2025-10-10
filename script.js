const videoPlayer = document.getElementById('videoPlayer');
const videoOverlay = document.getElementById('videoOverlay');
const videoContainer = document.getElementById('videoContainer');
const playButton = document.getElementById('playButton');

function togglePlay() {
    if (videoPlayer.paused || videoPlayer.ended) {
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
}

videoContainer.addEventListener('mousemove', (e) => {
    if (getComputedStyle(videoOverlay).display !== 'none') {
        const rect = videoContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        requestAnimationFrame(() => {
            playButton.style.left = `${x}px`;
            playButton.style.top = `${y}px`;
        });
    }
});

videoContainer.addEventListener('mouseenter', () => {
    if (getComputedStyle(videoOverlay).display !== 'none') {
        videoContainer.style.cursor = 'none';
    }
});

videoContainer.addEventListener('mouseleave', () => {
    videoContainer.style.cursor = 'default';
    requestAnimationFrame(() => {
        playButton.style.left = '50%';
        playButton.style.top = '50%';
    });
});

videoOverlay.addEventListener('click', () => {
    videoPlayer.play();
});

videoPlayer.addEventListener('play', () => {
    videoOverlay.style.opacity = '0';
    videoContainer.style.cursor = 'default';
    setTimeout(() => {
        videoOverlay.style.display = 'none';
    }, 300);
});

videoPlayer.addEventListener('pause', () => {
    if (!videoPlayer.ended) {
        videoOverlay.style.display = 'block';
        if (videoContainer.matches(':hover')) {
            videoContainer.style.cursor = 'none';
        }
        setTimeout(() => {
            videoOverlay.style.opacity = '1';
        }, 10);
    }
});

videoPlayer.addEventListener('ended', () => {
    videoOverlay.style.display = 'block';
    if (videoContainer.matches(':hover')) {
        videoContainer.style.cursor = 'none';
    }
    setTimeout(() => {
        videoOverlay.style.opacity = '1';
    }, 10);
});

videoPlayer.addEventListener('click', togglePlay);
