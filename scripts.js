/* Get our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenButton = player.querySelector('.fullscreen');

/* Build our functions */

function togglePlay() {

    //alternative way
    //const method = video.paused ? 'play' : 'pause';
    //video[method]();

    // alternative alternative way
    //video[video.paused ? 'play' : 'pause']();

    // regular way
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}

function skip() {
    //console.log('Skipping!');
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip); // because skip property
    // on dataset object is a string

}

function handleRangeUpdate() {
    video[this.name] = this.value;
    // console.log(this.name);
    // console.log(this.value);
    
}

function handleProgress() {
    // here we update the 'flex-basis' value to correspond to the video timer
    const percent = (video.currentTime / video.duration) * 100;
    // those two are properties of the video object
    // we multiply to one hundred to get the percentage
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    // here we check that the event object has a OFFSET X property, which 
    // we will use to determine how far in the bar the click was done
    console.log(e);
    // we divide the offetX by the entire width of the element
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function goFullScreen() {
    if(!isFullScreen) {
        video.requestFullscreen(); // is the name of the method of the video object
    } else {
        video.cancelFullscreen();
    }
    
}



/* Hook Up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

let isFullScreen = false;
fullScreenButton.addEventListener('click', goFullScreen);