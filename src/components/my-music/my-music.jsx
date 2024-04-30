import '../../styles/home.css';
import '../../styles/my-music.css';
import MusicTile from "./components/music-tile.jsx";
import MusicController from "./components/music-controller.jsx";
import { useEffect, useRef, useState } from "react";
import {THEMES} from "../../constants/themes.ts";
import { SONGS } from '../../constants/songs.ts';

function MyMusic(){
    const [numOfMusicTileCols,setNumOfMusicTiles] = useState(7);
    const [playSwitch, setPlaySwitch] = useState(false);
    const [numberOfMusicTiles,setNumberOfMusicTiles] = useState(100);
    const [selectedTheme,setSelectedTheme] = useState(THEMES[0].name);
    const [tileColNum,setTileColNum] = useState(6);
    const [tempo,setTempo] = useState(80)
    const [musicTileArray,setTileArray] = useState(getTileGrid());

    useEffect(()=>{
        const currentTheme = THEMES.find((theme)=>theme.name===selectedTheme);
        document.querySelector(':root').style.setProperty('--backgroundColor', currentTheme.colors.backgroundColor );
        document.querySelector(':root').style.setProperty('--evenMusicTileColor', currentTheme.colors.tileColor1 );
        document.querySelector(':root').style.setProperty('--oddMusicTileColor',currentTheme.colors.tileColor2 );
        document.querySelector(':root').style.setProperty('--firstBoxShadow',currentTheme.colors.shadowColor1 );
        document.querySelector(':root').style.setProperty('--secondBoxShadow',currentTheme.colors.shadowColor2 );
    },[selectedTheme])

    //Reset Animation on song change
    function handleSongChangeCallback(){
        document.getElementById('music-tile-wrapper').className = document.getElementById('music-tile-wrapper').className.replace('animation','');
        setTimeout(()=>{
            document.getElementById('music-tile-wrapper').className += ' animation';
        })
    }

    function handleThemeChangeCallback(themeName){
        setSelectedTheme(themeName);
    } 

    function getTileGrid(){
        //SET ALL CSS VARIABLES
        document.querySelector(':root').style.setProperty('--numOfMusicTileCols', numOfMusicTileCols );
        let tileArray = []
        for(let i=1;i<=numberOfMusicTiles;i++){
            tileArray.push(<MusicTile isPlaying={playSwitch}   tempo = {tempo} rowNumber = {Math.ceil(i/tileColNum)} tileNumber={i} key={i+"-music-tile"}></MusicTile>)
        }
        return tileArray;
    }

    return (
        <div id="hire-me-wrapper">
            <MusicController themeChangeCallback={handleThemeChangeCallback} songChangeCallback={handleSongChangeCallback} allSongs={SONGS} allThemes={THEMES} tempo = {tempo}/>
            <div id="music-tile-wrapper" className=''>
                {
                    musicTileArray
                }
            </div>
        </div>
    )
}

export default MyMusic;

