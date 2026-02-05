// script.js

// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Music Player Elements
const music = document.getElementById("bgMusic");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const volumeSlider = document.getElementById("volumeSlider");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const songTitleEl = document.getElementById("song-title");
const songArtistEl = document.getElementById("song-artist");

// Playlist with metadata
const playlist = [
    { src: "assets/song1.mp3", title: "nothin on u", artist: "Bazzi" },
    { src: "assets/song2.mp3", title: "Song Two", artist: "Artist B" },
    { src: "assets/song3.mp3", title: "Song Three", artist: "Artist C" },
    { src: "assets/song4.mp3", title: "Song Four", artist: "Artist D" },
    { src: "assets/song5.mp3", title: "Song Five", artist: "Artist E" },
    { src: "assets/song6.mp3", title: "Song Six", artist: "Artist F" },
    { src: "assets/song7.mp3", title: "Song Seven", artist: "Artist G" },
    { src: "assets/song8.mp3", title: "Song Eight", artist: "Artist H" },
    { src: "assets/song9.mp3", title: "Song Nine", artist: "Artist I" },
    { src: "assets/song10.mp3", title: "Song Ten", artist: "Artist J" }
];

let currentSong = 0;
let isPlaying = false;

// -----------------------------
// Music Functions
// -----------------------------
function loadSong(index) {
    const song = playlist[index];
    music.src = song.src;
    songTitleEl.textContent = song.title;
    songArtistEl.textContent = song.artist;
    music.volume = volumeSlider.value;
}

function togglePlay() {
    if (isPlaying) {
        music.pause();
    } else {
        music.play();
    }
}

// -----------------------------
// Music Event Listeners
// -----------------------------
playPauseBtn.addEventListener("click", togglePlay);

nextBtn.addEventListener("click", () => {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    music.play();
});

prevBtn.addEventListener("click", () => {
    currentSong = (currentSong - 1 + playlist.length) % playlist.length;
    loadSong(currentSong);
    music.play();
});

music.addEventListener("ended", () => {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    music.play();
});

music.addEventListener("play", () => {
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
});

music.addEventListener("pause", () => {
    isPlaying = false;
    playPauseBtn.textContent = "▶️";
});

volumeSlider.addEventListener("input", () => {
    music.volume = volumeSlider.value;
});

music.addEventListener("timeupdate", () => {
    if (music.duration) {
        const progressPercent = (music.currentTime / music.duration) * 100;
        progressBar.value = progressPercent;

        const curMin = Math.floor(music.currentTime / 60);
        const curSec = Math.floor(music.currentTime % 60).toString().padStart(2,"0");
        currentTimeEl.textContent = `${curMin}:${curSec}`;

        const durMin = Math.floor(music.duration / 60);
        const durSec = Math.floor(music.duration % 60).toString().padStart(2,"0");
        durationEl.textContent = `${durMin}:${durSec}`;
    }
});

progressBar.addEventListener("input", () => {
    if (music.duration) {
        music.currentTime = (progressBar.value / 100) * music.duration;
    }
});

// Click Envelope (start page + music)

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";
    
    loadSong(currentSong);
    music.play();

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});

const heartContainer = document.getElementById("heart-container");

function spawnHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    // Random horizontal start position around center
    heart.style.left = Math.random() * 60 - 30 + "%"; // ±30% around center

    // Random size (10px to 20px)
    const size = Math.random() * 10 + 10; // 10–20px
    heart.style.width = size + "px";
    heart.style.height = size + "px";

    // Random pink/red color
    const colors = ["#ff4d6d", "#ff6699", "#ff3366", "#ff1a75", "#ff99aa"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.backgroundColor = color;
    heart.style.setProperty("--heart-color", color);

    // Random float duration (1.5s – 3s)
    const floatDuration = Math.random() * 1.5 + 1.5; 
    heart.style.animationDuration = floatDuration + "s";

    // Random horizontal drift
    const drift = Math.random() * 30 - 15; // ±15px
    heart.style.setProperty("--drift", drift + "px");

    heartContainer.appendChild(heart);

    // Remove after animation
    setTimeout(() => {
        heart.remove();
    }, floatDuration * 1000);
}
