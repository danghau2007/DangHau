const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [    
    {
        path: 'E:/y2mate.com - 神聖かまってちゃん僕の戦争Music Video.mp3',
        displayName: '僕の戦争',
        cover: 'E:/videoframe_6459.png',
        artist: '神聖かまってちゃん',
    },
    {
        path: 'E:/y2mate.com - Red Swan Attack on Titan anime theme  進撃の巨人 Official Lyric Video YOSHIKI feat HYDE.mp3',
        displayName: 'Red Swan',
        cover: 'E:/1379590.png',
        artist: '進撃の巨人 feat. HYDE',
    },

    {
        path: 'E:/y2mate.com - Orange  7  Shigatsu wa kimi no uso   Tháng tư là lời nói dối của em  LyricsVietsub.mp3',
        displayName: 'Shigatsu wa kimi no uso',
        cover: 'E:/744633.png',
        artist: 'seven oops',
    },
        {
        path: 'E:/y2mate.com - SUÝT  Ngọt.mp3',
        displayName: 'SUÝT ep1 ep2',
        cover: 'E:/videoframe_4364.png',
        artist: 'Ngọt',
    },
            {
        path: 'E:/sound/LENぞ97n10火巨説MAHLE.mp3',
        displayName: 'LENぞ97n10火巨説MAHLE',
        cover: 'E:/463603.jpg',
        artist: 'Hiroyuki Sawano',
    },
                {
        path: 'E:/y2mate.com - Intro.mp3',
        displayName: 'Intro',
        cover: 'E:/videoframe_622.png',
        artist: 'The xx',
    },
];

let musicIndex = 5;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
playMusic();