const audio = document.querySelector('audio');
const backgroundSound = document.getElementById('backgroundSound');
// звук падения находится на 292 строке

const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');

audio.addEventListener('canplaythrough', () => {
    playBtn.addEventListener('click', () => {
        audio.play();
    });
});

pauseBtn.addEventListener('click', () => {
    audio.pause();
});

const volumeSlider = document.getElementById('volumeSlider');
volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value;
    backgroundSound.volume = volume;
});

