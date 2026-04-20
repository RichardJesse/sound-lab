function setVolume(val) {
  val = Math.max(0, Math.min(100, val));
  audio.volume = val / 100;
  volumeSlider.value = val;
  volumeLabel.textContent = Math.round(val) + '%';
}

volumeSlider.addEventListener('input', () => setVolume(Number(volumeSlider.value)));
btnVolDown.addEventListener('click', () => setVolume(Number(volumeSlider.value) - 10));
btnVolUp.addEventListener('click',   () => setVolume(Number(volumeSlider.value) + 10));

function toggleMute() {
  isMuted = !isMuted;
  audio.muted = isMuted;
  iconVol.style.display  = isMuted ? 'none' : 'block';
  iconMute.style.display = isMuted ? 'block' : 'none';
  btnMute.classList.toggle('active', isMuted);
}

btnMute.addEventListener('click', toggleMute);
