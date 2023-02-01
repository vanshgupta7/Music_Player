console.log("Hello");
let songIndex=0;
let play = document.getElementById("masterplay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let shuffle= document.getElementById("shuffle");
let shuffleOn=0;
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let bottomName = document.getElementById("bottom-name");
let songItems = Array.from(document.getElementsByClassName('songContent'));


let songs=[
    {songName:"Highway to Hell",filePath:"songs/1.mp4",
    coverPath:"covers/acdc.jpeg",duration:"5:03"},
    {songName:"Infinity",filePath:"songs/2.mp4",
    coverPath:"covers/Infinity.jpeg",duration:"3:02"},
    {songName:"No Lie",filePath:"songs/3.mp4",
    coverPath:"covers/NoLie.jpeg",duration:"2:53"},
    {songName:"Enemy",filePath:"songs/4.mp4",
    coverPath:"covers/Enemy.jpeg",duration:"3:45"},
    {songName:"Centuries",filePath:"songs/5.mp4",
    coverPath:"covers/Centuries.jpg",duration:"4:03"},
    {songName:"Sunflower",filePath:"songs/6.mp4",
    coverPath:"covers/Sunflower.jpeg",duration:"2:55"},
    {songName:"Heat Waves",filePath:"songs/7.mp4",
    coverPath:"covers/HeatWaves.jpeg",duration:"3:13"}
];

// console.log(1);
// console.log(songItems);
songItems.forEach((songItem,i)=>{
    songItem.getElementsByTagName("img")[0].src=songs[i].coverPath;
    songItem.getElementsByClassName("songName")[0].innerHTML=songs[i].songName;
    songItem.getElementsByClassName("time")[0].innerHTML=songs[i].duration;

    // console.log(songItem.getElementsByClassName("songName")[0]);
});
// let audioElement= new Audio("songs/videoplayback.mp4")
let audioElement= new Audio(`${songs[songIndex]['filePath']}`)

function player(){
    makeAllPlays();
    bottomName.innerText = songs[songIndex].songName;
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
    makeAllPlays();
    songIndex=(songIndex+1)%songs.length;
    console.log(songIndex);
    bottomName.innerText = songs[songIndex].songName;
    audioElement.src=`${songs[songIndex]['filePath']}`;
    audioElement.play();
}

function prevSong(){
    makeAllPlays();
    if(songIndex!=0){
        songIndex=(songIndex-1);
    }
    else{
        songIndex=songs.length-1;
    }
    console.log(songIndex);
    bottomName.innerText = songs[songIndex].songName;
    audioElement.src=`${songs[songIndex]['filePath']}`;
    audioElement.play();
}

play.addEventListener("click",() =>{
    console.log("1");
    player();
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("play-icon")).forEach((element)=>{
        console.log(element)
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
        element.style.color="black";
    })
}
Array.from(document.getElementsByClassName("play-icon")).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        console.log("Pressed");
        console.log(e.target.id);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.style.color = "lightgreen";
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        console.log(songIndex);
        audioElement.src = `${songs[songIndex]['filePath']}`;
        bottomName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
    })
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
        // console.log(progress);
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
