console.log("Hello");
let songIndex=0;
let play = document.getElementById("masterplay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let shuffle= document.getElementById("shuffle");
let shuffleOn=0;
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let songs=[
    {songName:"Highway to Hell",filePath:"songs/videoplayback.mp4",
    coverPath:"covers/acdc.jpeg"},
    {songName:"Highway to Hell",filePath:"songs/2.mp4",
    coverPath:"covers/acdc.jpeg"},
    {songName:"Highway to Hell",filePath:"songs/3.mp4",
    coverPath:"covers/acdc.jpeg"},
    {songName:"Highway to Hell",filePath:"songs/videoplayback.mp4",
    coverPath:"covers/acdc.jpeg"},
    {songName:"Highway to Hell",filePath:"songs/videoplayback.mp4",
    coverPath:"covers/acdc.jpeg"},
    {songName:"Highway to Hell",filePath:"songs/videoplayback.mp4",
    coverPath:"covers/acdc.jpeg"},
    {songName:"Highway to Hell",filePath:"songs/2.mp4",
    coverPath:"covers/acdc.jpeg"}


]

// let audioElement= new Audio("songs/videoplayback.mp4")
let audioElement= new Audio(`${songs[songIndex]['filePath']}`)

function player(){
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
        gif.style.opacity=0;
    }
}

function nextSong(){
    songIndex=(songIndex+1)%songs.length;
    console.log(songIndex);
    audioElement.src=`${songs[songIndex]['filePath']}`;
    audioElement.play();
}

function prevSong(){
    if(songIndex!=0){
        songIndex=(songIndex-1);
    }
    else{
        songIndex=songs.length-1;
    }
    console.log(songIndex);
    audioElement.src=`${songs[songIndex]['filePath']}`;
    audioElement.play();
}

play.addEventListener("click",() =>{
    console.log("1");
    player();
})

audioElement.addEventListener('timeupdate',()=>{
    // console.log("update");
    if(audioElement.currentTime==audioElement.duration && 
        shuffleOn==1){
        // audioElement.pause();
        audioElement.currentTime=0;
        audioElement.play();
        myProgressBar.value=0;
        // play.classList.remove('fa-pause');
        // play.classList.add('fa-play');
        // gif.style.opacity=0;
    }
    else if(audioElement.currentTime==audioElement.duration && 
    shuffleOn==0){
        songIndex=(songIndex+1)%songs.length;
        // console.log(songIndex);
        audioElement.src=`${songs[songIndex]['filePath']}`;
        audioElement.play();
    }
    else{
        progress= audioElement.currentTime/audioElement.duration*100;
        console.log(progress);
        myProgressBar.value = progress;
    }
})

shuffle.addEventListener("click",()=>{
    if(shuffleOn==0){
        console.log("3");
        shuffleOn=1;
        shuffle.style.color= "lightgreen";
    }
    else{
        console.log("3");
        shuffleOn=0;
        shuffle.style.color= "white";
    }
})

myProgressBar.addEventListener("change", ()=>{
    audioElement.currentTime=myProgressBar.value *audioElement.duration/100;
})

next.addEventListener("click",()=>{
    // audioElement.pause();
    console.log("Next");
    nextSong();
    // myProgressBar.value=0;

})

prev.addEventListener("click",()=>{
    console.log("Prev");
    prevSong();
})


document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
      console.log('Space pressed')
      player();
    }
    else if(event.code ==='ArrowRight'){
        console.log("Right Arrow");
        nextSong();
    }
    else if(event.code ==='ArrowLeft'){
        console.log("Left Arrow");
        prevSong();
    }
  })
