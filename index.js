let navLinks =document.getElementById("navLinks");
function showMenu(){
    navLinks.style.left ="0";}

    function hideMenu(){
    navLinks.style.left ="-200px";
}

// music player
//Music
let previous = document.querySelector('#prev');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let slider = document.querySelector('#duration_slider');
let track_image = document.querySelector('#cover');
let auto_play = document.querySelector('#auto');
let artist = document.querySelector('#singer');
let timer;
let autoplay = 0;
let index_no = 0;
let playing_song = false;

//create a audio element
let track = document.createElement('audio');

//all songs
let song = [{
        name: "Faded",
        path: "musics/Alan_Walker_-_Faded.mp3",
        img: "images/Rectangle 15.png",
        singer: "Alen Walker"
    },
    {
        name: "K-drama",
        path: "musics/AUD-20221014-WA0016.mp3",
        img: "images/Rectangle 20.png",
        singer: "Kim Woo Bin"
    },
    {
        name: "Unstoppable",
        path: "musics/Sia, R3HAB - Unstoppable.mp3",
        img: "images/Rectangle 18.png",
        singer: "Sia, R3HAB"
    },
    {
        name: "lonley",
        path: "musics/Akon-lonely.mp3",
        img: "images/Lead-image.png",
        singer: "Akon"
    },
    {
        name: "Strength of woman",
        path: "musics/strenght of woman.mp3",
        img: "images/Rectangle 14 (2).png",
        singer: "Shaggy"
    }
];

//Function to load 
function load_track(index_no) {
    clearInterval(timer);
    reset_slider();
    track.src = song[index_no].path;
    title.innerHTML = song[index_no].name;
    track_image.src = song[index_no].img;
    artist.innerHTML = song[index_no].singer;
    track.load();

    timer = setInterval(range_slider, 1000);

}
load_track(index_no);

//reset  song slider
function reset_slider() {
    slider.value = 0;
}



//checking the song is playing or  not
function justplay() {
    if (playing_song == false) {
        playsong();
    } else {
        pausesong();
    }
}

//play song
function playsong() {
    track.play();
    playing_song = true;
    play.classList.remove('bx-play');
    play.classList.add('bx-pause');

}


//pause song
function pausesong() {
    track.pause();
    playing_song = false;
    play.classList.remove('bx-pause');
    play.classList.add('bx-play');
}


//next song
function next_song() {
    if (index_no < song.length - 1) {
        index_no += 1;
        load_track(index_no);
        playsong();
    } else {
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}



//previous song
function previous_song() {
    if (index_no > 0) {
        index_no -= 1;
        load_track(index_no);
        playsong();
    } else {
        index_no = song.length;
        load_track(index_no);
        playsong();
    }
}


//change volume
function volume_change() {
    volume_show = track.duration * (slider.value / 100);
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

// change slider position
function change_duration() {
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}
//autoplay function
function autoplay_switch() {
    if (autoplay == 1) {
        autoplay = 0;
        auto_play.style.color = "#FFF";
    } else {
        autoplay = 1;
        auto_play.style.color = "#FACD66";
    }
}

function range_slider() {
    let position = 0;

    //update slider position
    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

    //function will run when the song is over
    if (track.ended) {
        play.classList.add('bx-play');
        if (autoplay == 1) {
            index_no += 1;
            load_track(index_no);
            playsong();
        }
    }
}



