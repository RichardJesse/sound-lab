
const playlist = [
  {
    name: 'Ambient Piano',
    artist: 'SoundLab Demo',
    src: 'https://actions.google.com/sounds/v1/ambiences/crosswalk_beeping.ogg'
  },
  {
    name: 'Ocean Waves',
    artist: 'SoundLab Demo',
    src: 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg'
  },
  {
    name: 'Thunder Storm',
    artist: 'SoundLab Demo',
    src: 'https://actions.google.com/sounds/v1/weather/thunder_crack.ogg'
  }
];


const audio           = new Audio();
const trackNameEl     = document.getElementById('trackName');
const trackArtistEl   = document.getElementById('trackArtist');
const btnPlay         = document.getElementById('btnPlay');
const iconPlay        = document.getElementById('iconPlay');
const iconPause       = document.getElementById('iconPause');
const btnLoop         = document.getElementById('btnLoop');
const btnMute         = document.getElementById('btnMute');
const iconVol         = document.getElementById('iconVol');
const iconMute        = document.getElementById('iconMute');
const btnPrev         = document.getElementById('btnPrev');
const btnNext         = document.getElementById('btnNext');
const btnSkipBack     = document.getElementById('btnSkipBack');
const btnSkipFwd      = document.getElementById('btnSkipFwd');
const btnVolDown      = document.getElementById('btnVolDown');
const btnVolUp        = document.getElementById('btnVolUp');
const volumeSlider    = document.getElementById('volumeSlider');
const volumeLabel     = document.getElementById('volumeLabel');
const progressContainer = document.getElementById('progressContainer');
const progressBar     = document.getElementById('progressBar');
const currentTimeEl   = document.getElementById('currentTime');
const durationEl      = document.getElementById('duration');
const playlistContainer = document.getElementById('playlistContainer');
const fileInput       = document.getElementById('fileInput');
const speedBtns       = document.querySelectorAll('.speed-btn');

let currentTrackIndex   = -1;
let isPlaying           = false;
let isMuted             = false;
let isLooping           = false;


audio.volume      = 0.8;
audio.preload     = 'metadata';
