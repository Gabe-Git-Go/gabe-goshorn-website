import AboutMe from "./home-page-components/about-me";
import '../styles/home.css'
import MusicTile from "./shared/music-tile";
import { useEffect, useRef, useState } from "react";

function MyMusic(){
    const colorSwitch = useRef({value: true});
    const [playSwitch, setPlaySwitch] = useState(false);
    const [numberOfMusicTiles,setNumberOfMusicTiles] = useState(100);
    const [themeColors,setThemeColors] = useState(["rgba(154, 183, 230,.75)","rgba(175, 219, 192,.75)"])
    const [tileColorArray,setTileColorArray] = useState(generateRandomColor());
    const [tileColNum,setTileColNum] = useState(7);
    const [tempo,setTempo] = useState(140)
    const [counter,setCounter] = useState(0);
    const [musicTileArray,setTileArray] = useState(getTileGrid());
    let i = 0;


    //var styleRoot = document.querySelector(':root');
    //styleRoot.style.setProperty('--numOfMusicTileCols', tileColNum);
    function getTileGrid(){
        console.log("AH")
        let tileArray = []
        for(let i=1;i<=numberOfMusicTiles;i++){
            tileArray.push(<MusicTile isPlaying={playSwitch} colorGeneratorCallback = {(tileNumber,rowNumber,musicSwitch)=>generateRandomColor(tileNumber,rowNumber,musicSwitch)} tempo = {tempo} rowNumber = {Math.ceil(i/tileColNum)} tileNumber={i} key={i+"-music-tile"}></MusicTile>)
        }
        return tileArray;
    }
    function generateRandomColor(tileNumber,rowNumber,musicSwitch,setColorSwitchCallbacki){
        let color = "";
        if(tileNumber===1){
            colorSwitch.value = !colorSwitch.value;
            console.log("color switch",colorSwitch.value)
        } 
        if(colorSwitch.value){
            color = tileNumber%2===0?themeColors[0]:themeColors[1];
        }else{
            color = tileNumber%2===0?themeColors[1]:themeColors[0];
        }
        return color;
    }

    function togglePlay(){
        setPlaySwitch(!playSwitch);
    }

    
        // return `rgba(${Math.floor(Math.random() * 255)}, 
        //     ${Math.floor(Math.random() * 150)}, 
        //     ${Math.floor(Math.random() * 0)},
        //     ${Math.random() +.25}`;
    //     let color = ""
    //     console.log("The switch",musicSwitch)
    //     if(tileNumber%2===0){
    //         color = musicSwitch?'black':'white';
    //     }else{
    //         color = musicSwitch?'white':'black';
    //     }
    //     //setMusicSwitch(false);
    //     return color;
    // function startParty(){
    //     console.log(i++);
    //     let bpm = 120;
    //     debugger;
    //     setInterval(()=>{
    //        // setTileColorArray(getAllRandomColors());
    //     },4000);
    // }

    // function getAllRandomColors(){
    //     console.log("woah")
    //     let colorArray = [];
    //     for(let i=0;i<numberOfMusicTiles;i++){
    //         colorArray.push(generateRandomColor());
    //     }
    //     return colorArray;
    // }

    // function doNothing(){
    //     console.log("IAM NOTHING")
    // }


    return (
        <div id="hire-me-wrapper">
            my-music
            {/* <button onClick={togglePlay()}>play</button> */}
            <button onClick={togglePlay}>Play me</button>
            {/* <h1>{playSwitch}</h1> */}
            <div id="music-tile-wrapper">
                    {
                        musicTileArray
                    }
            </div>
        </div>
    )
}

export default MyMusic;

