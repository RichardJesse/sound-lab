function formatTime(sec) {
  if (isNaN(sec) || !isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ':' + String(s).padStart(2, '0');
}

function loadTrack(index) {
  if (index < 0 || index >= playlist.length) return;
  currentTrackIndex = index;
  const track = playlist[index];
  audio.src = track.src;
  trackNameEl.textContent   = track.name;
  trackArtistEl.textContent = track.artist;
  updatePlaylistUI();
  playAudio();
}

function playAudio() {
  audio.play().then(() => {
    isPlaying = true;
    updatePlayPauseUI();
  }).catch(() => {});
}

function pauseAudio() {
  audio.pause();
  isPlaying = false;
  updatePlayPauseUI();
}

function togglePlay() {
  if (!audio.src || audio.src === window.location.href) {
   
    if (playlist.length > 0) loadTrack(0);
    return;
  }
  isPlaying ? pauseAudio() : playAudio();
}

function updatePlayPauseUI() {
  iconPlay.style.display  = isPlaying ? 'none' : 'block';
  iconPause.style.display = isPlaying ? 'block' : 'none';
}

function toggleLoop() {
  isLooping = !isLooping;
  audio.loop = isLooping;
  btnLoop.classList.toggle('active', isLooping);
}


btnSkipBack.addEventListener('click', () => {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
});
btnSkipFwd.addEventListener('click', () => {
  audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
});


audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width   = pct + '%';
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
  if (!isLooping) {
   
    if (currentTrackIndex < playlist.length - 1) {
      loadTrack(currentTrackIndex + 1);
    } else {
      pauseAudio();
      audio.currentTime = 0;
      progressBar.style.width = '0%';
    }
  }
});

progressContainer.addEventListener('click', (e) => {
  if (!audio.duration) return;
  const rect = progressContainer.getBoundingClientRect();
  const pct  = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pct * audio.duration;
});


function prevTrack() {
  if (playlist.length === 0) return;
  const index = currentTrackIndex > 0 ? currentTrackIndex - 1 : playlist.length - 1;
  loadTrack(index);
}

function nextTrack() {
  if (playlist.length === 0) return;
  const index = currentTrackIndex < playlist.length - 1 ? currentTrackIndex + 1 : 0;
  loadTrack(index);
}

btnPlay.addEventListener('click', togglePlay);
btnLoop.addEventListener('click', toggleLoop);
btnPrev.addEventListener('click', prevTrack);
btnNext.addEventListener('click', nextTrack);
