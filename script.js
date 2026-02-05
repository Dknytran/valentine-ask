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
    { src: "assets/song2.mp3", title: "Sofia", artist: "Clairo" },
    { src: "assets/song3.mp3", title: "Yellow", artist: "Coldplay" },
    { src: "assets/song4.mp3", title: "love.", artist: "wave to earth" },
    { src: "assets/song5.mp3", title: "ONLY", artist: "Lee Hi" }
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
    music.heartInterval = setInterval(spawnHeart, 400);
});

music.addEventListener("pause", () => {
    isPlaying = false;
    playPauseBtn.textContent = "▶️";
    clearInterval(music.heartInterval);
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
const playerHeight = 80; // Spotify player height
const padding = 10; // space from edges

noBtn.addEventListener("mouseover", () => {
    // const min = 200;
    // const max = 200;

    // const distance = Math.random() * (max - min) + min;
    // const angle = Math.random() * Math.PI * 2;

    // const moveX = Math.cos(angle) * distance;
    // const moveY = Math.sin(angle) * distance;

    // noBtn.style.transition = "transform 0.3s ease";
    // noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    const rect = noBtn.getBoundingClientRect();

    // Random distance ±150px horizontally, ±150px vertically
    let moveX = (Math.random() - 0.5) * 300; 
    let moveY = (Math.random() - 0.5) * 300;

    // Calculate new absolute position
    let newX = rect.left + moveX;
    let newY = rect.top + moveY;

    // Constrain horizontally
    if (newX < padding) moveX += padding - newX;
    if (newX + rect.width > window.innerWidth - padding)
        moveX -= (newX + rect.width) - (window.innerWidth - padding);

    // Constrain vertically (stay above Spotify player)
    if (newY < padding) moveY += padding - newY;
    if (newY + rect.height > window.innerHeight - playerHeight - padding)
        moveY -= (newY + rect.height) - (window.innerHeight - playerHeight - padding);

    // Apply transform
    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;

    // Ensure NO button is above the player
    noBtn.style.zIndex = 1000;
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
