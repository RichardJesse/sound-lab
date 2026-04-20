
document.addEventListener('keydown', (e) => {
 
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
    e.preventDefault();
  }

  switch (e.code) {
    case 'Space':
      togglePlay();
      break;
    case 'KeyM':
      toggleMute();
      break;
    case 'KeyL':
      toggleLoop();
      break;
    case 'ArrowLeft':
      audio.currentTime = Math.max(0, audio.currentTime - 10);
      break;
    case 'ArrowRight':
      audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
      break;
    case 'ArrowUp':
      setVolume(Number(volumeSlider.value) + 5);
      break;
    case 'ArrowDown':
      setVolume(Number(volumeSlider.value) - 5);
      break;
  }
});
