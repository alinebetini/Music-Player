const image = document.querySelector('#cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const background = document.getElementById("background");

// Music
const songs = [
    {
        path: 'audio/Come_Together.mp3',
        displayName: 'Come Together',
        artist: 'Gary Clark Jr.',
        cover: "https://images-na.ssl-images-amazon.com/images/I/51JtYzbgsvL._AC_SL1000_.jpg",
    },
    {
        path: 'audio/Dont_Slack.mp3',
        displayName: "Don't Slack",
        artist: 'Anderson .Paak, Justin Timberlake',
        cover: "https://m.media-amazon.com/images/I/71nFrponl8L._SS500_.jpg",
    },
    {
        path: 'audio/Flumpool.mp3',
        displayName: 'Yoru wa Nemureru kai?',
        artist: 'Flumpool',
        cover: "https://images-na.ssl-images-amazon.com/images/I/91ltJ7lxJ+L.jpg",
    },
    {
        path: 'audio/Lost_Soul.mp3',
        displayName: 'Lost Soul',
        artist: 'Ten',
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyMZ7clqbvAu7PaPRdChx92lEDICb_hCsTQA&usqp=CAU",
    },
    {
        path: 'audio/Mi_Gente.mp3',
        displayName: 'Mi Gente',
        artist: 'J Balvin, Willy William, Beyoncé',
        cover: "https://upload.wikimedia.org/wikipedia/en/9/99/J_Balvin_Mi_Gente.jpg",
    },
    {
        path: 'audio/On _the_Inside.mp3',
        displayName: 'On The Inside',
        artist: 'Daughtry',
        cover: "https://i.ytimg.com/vi/aEjfWhyz-qg/hqdefault.jpg",
    },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = song.path;
    changeCover(song.cover);
}

function changeCover(cover) {
    image.classList.remove('active');
    setTimeout(() => {
        image.src = cover;
        image.classList.add('active');
    }, 100)
    background.src = cover;
}

// Current Song
let songIndex = 0;

// Previous Song                                                                                                                                     
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for currentTime                                                                                                                                     
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);