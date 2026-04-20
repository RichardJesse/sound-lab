let dragSrcIndex = null;

function buildPlaylist() {
  playlistContainer.innerHTML = '';
  playlist.forEach((track, i) => {
    const item = document.createElement('div');
    item.className = 'playlist-item' + (i === currentTrackIndex ? ' active' : '');
    item.draggable = true;
    item.dataset.index = i;
    item.innerHTML = `<span class="pl-num">${i + 1}</span><span class="pl-text">${track.name} — <small style="color:#777">${track.artist}</small></span><button class="pl-remove" title="Remove">&times;</button>`;

    // Click to play (only if not clicking remove button)
    item.addEventListener('click', (e) => {
      if (e.target.closest('.pl-remove')) return;
      loadTrack(i);
    });

    // Remove button
    item.querySelector('.pl-remove').addEventListener('click', (e) => {
      e.stopPropagation();
      removeTrack(i);
    });

    // Drag-and-drop events
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragend', handleDragEnd);

    playlistContainer.appendChild(item);
  });
}

function updatePlaylistUI() {
  const items = playlistContainer.querySelectorAll('.playlist-item');
  items.forEach((item, i) => {
    item.classList.toggle('active', i === currentTrackIndex);
  });
}

function handleDragStart(e) {
  dragSrcIndex = Number(this.dataset.index);
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
  e.preventDefault();
  this.classList.add('drag-over');
}

function handleDragLeave() {
  this.classList.remove('drag-over');
}

function handleDrop(e) {
  e.stopPropagation();
  const targetIndex = Number(this.dataset.index);

  if (dragSrcIndex !== null && dragSrcIndex !== targetIndex) {
 
    const movedTrack = playlist.splice(dragSrcIndex, 1)[0];
    playlist.splice(targetIndex, 0, movedTrack);

    if (currentTrackIndex === dragSrcIndex) {
      currentTrackIndex = targetIndex;
    } else if (dragSrcIndex < currentTrackIndex && targetIndex >= currentTrackIndex) {
      currentTrackIndex--;
    } else if (dragSrcIndex > currentTrackIndex && targetIndex <= currentTrackIndex) {
      currentTrackIndex++;
    }

    buildPlaylist();
  }

  this.classList.remove('drag-over');
}

function handleDragEnd() {
  dragSrcIndex = null;
  const items = playlistContainer.querySelectorAll('.playlist-item');
  items.forEach(item => {
    item.classList.remove('dragging', 'drag-over');
  });
}

function removeTrack(index) {
  if (playlist.length <= 1) return;

  const wasPlaying = index === currentTrackIndex;
  playlist.splice(index, 1);

  if (wasPlaying) {
    if (index < playlist.length) {
      currentTrackIndex = index;
      loadTrack(currentTrackIndex);
    } else {
      currentTrackIndex = playlist.length - 1;
      loadTrack(currentTrackIndex);
    }
  } else if (index < currentTrackIndex) {
    currentTrackIndex--;
  }

  buildPlaylist();
}

buildPlaylist();

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
 
  const newTrack = {
    name: file.name.replace(/\.[^.]+$/, ''),
    artist: 'Local File',
    src: url
  };
  playlist.push(newTrack);
  buildPlaylist();
  loadTrack(playlist.length - 1);
});
