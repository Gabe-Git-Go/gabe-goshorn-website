import AboutMe from "./home-page-components/about-me";
import '../styles/home.css'
import MusicTile from "./shared/music-tile";
import playBtn from '../assets/music-assets/music-ctrl-images/play_button.png'
import playBtnPressed from '../assets/music-assets/music-ctrl-images/play_button_pressed.png'
import pauseBtn from '../assets/music-assets/music-ctrl-images/pause_button.png'
import pauseBtnPressed from '../assets/music-assets/music-ctrl-images/pause_button_pressed.png'
import mySong from '../assets/music-assets/music-audio/the_park_80_bpm.wav'
import { useEffect, useRef, useState } from "react";

function MyMusic(){
    const [isPauseBtnPressed,setPauseBtnPressed] = useState(false);
    const colorSwitch = useRef({value: true});
    const [currSong, setCurrSong] = useState(new Audio(mySong))
    const [playSwitch, setPlaySwitch] = useState(false);
    const [numberOfMusicTiles,setNumberOfMusicTiles] = useState(100);
    const [themeColors,setThemeColors] = useState(["rgba(154, 183, 230,.75)","rgba(175, 219, 192,.75)"])
    const [tileColNum,setTileColNum] = useState(6);
    const [tempo,setTempo] = useState(80)
    const [musicTileArray,setTileArray] = useState(getTileGrid());

    //When play switch is changed, update the tile grid, and stop/start audio
    useEffect(()=>{
        if(playSwitch){
            for(let i=0;i<document.getElementsByClassName('music-tile').length;i++){
                document.getElementsByClassName('music-tile').item(i).className = document.getElementsByClassName('music-tile').item(i).className.replace('paused','');
                document.getElementsByClassName('music-tile').item(i).className += ' play'
            }
            currSong.play();
        }else{
            for(let i=0;i<document.getElementsByClassName('music-tile').length;i++){
                document.getElementsByClassName('music-tile').item(i).className = document.getElementsByClassName('music-tile').item(i).className.replace('play','');
                document.getElementsByClassName('music-tile').item(i).className += ' paused'
            }
            currSong.pause();
        }
        //currSong.current
        setTileArray(getTileGrid());

    },[playSwitch])

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         setPauseBtnPressed(false);
    //     },1000)
    // },[pauseBtnPressed])
    
    function getTileGrid(){
        let tileArray = []
        for(let i=1;i<=numberOfMusicTiles;i++){
            tileArray.push(<MusicTile isPlaying={playSwitch} themeColors = {themeColors} colorGeneratorCallback = {(tileNumber,rowNumber,musicSwitch)=>generateRandomColor(tileNumber,rowNumber,musicSwitch)} tempo = {tempo} rowNumber = {Math.ceil(i/tileColNum)} tileNumber={i} key={i+"-music-tile"}></MusicTile>)
        }
        return tileArray;
    }
    function generateRandomColor(tileNumber,rowNumber,musicSwitch){
        let color = "";
        if(tileNumber===1){
            colorSwitch.value = !colorSwitch.value;
        } 
        if(colorSwitch.value){
            color = tileNumber%2===0?themeColors[0]:themeColors[1];
        }else{
            color = tileNumber%2===0?themeColors[1]:themeColors[0];
        }
        return color;
    }

    function switchPlay(isOn){
        if(!isOn){
            setPauseBtnPressed(true);
            setTimeout(()=>{
                setPauseBtnPressed(false);
            },500)
        }
        setPlaySwitch(isOn);
    }

    return (
        <div id="hire-me-wrapper">
            <div className="music-ctrl-wrapper">
                <img className={"music-ctrl"} id= "play-btn" onClick={ () =>switchPlay(true)} src={playSwitch?playBtnPressed:playBtn} alt="Play Button" />
                <img className={"music-ctrl"} id = "pause-btn" onClick={ () =>switchPlay(false)} src={isPauseBtnPressed?pauseBtnPressed:pauseBtn} alt="Pause Buttton" />
                <span className="music-ctrl song-title">N o w P la ying...</span>
            </div>
            <div id="music-tile-wrapper">
                {
                    musicTileArray
                }
            </div>
        </div>
    )
}

export default MyMusic;

