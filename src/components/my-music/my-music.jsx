import '../../styles/home.css';
import '../../styles/my-music/my-music.css';
import MusicTile from "./components/music-tile.jsx";
import MusicController from "./components/music-controller.jsx";
import { useEffect, useRef, useState } from "react";
import {THEMES} from "../../constants/themes.ts";
import { SONGS } from '../../constants/songs.ts';
import { TILE_ANIMATIONS } from '../../constants/tileAnimations.ts';
function MyMusic(){
    const [numOfMusicTileCols,setNumOfMusicTiles] = useState(7);
    const [playSwitch, setPlaySwitch] = useState(false);
    const [numberOfMusicTiles,setNumberOfMusicTiles] = useState(100);
    const [selectedTheme,setSelectedTheme] = useState(THEMES[0].name);
    const [tempo,setTempo] = useState(80)
    const [musicTileArray,setTileArray] = useState(getTileGrid());

    useEffect(() => {
        // Function to be called when window is resized
        document.getElementById("music-tile-wrapper").scrollIntoView();
        
        if(window.innerWidth<600){
            setNumOfMusicTiles(5);
        }
        else if(window.innerWidth<1200){
            setNumOfMusicTiles(5);
        }else{
            setNumOfMusicTiles(7);
        }
        const handleResize = () => {
            if(window.innerWidth<600){
                setNumOfMusicTiles(5);
            }
            else if(window.innerWidth<1200){
                setNumOfMusicTiles(5);
            }else{
                setNumOfMusicTiles(7);
            }
        };
    
        // Add event listener when component mounts
        window.addEventListener('resize', handleResize);
    
        // Remove event listener when component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
            
        };
      }, []); 

    //Set Theme
    useEffect(()=>{
        const currentTheme = THEMES.find((theme)=>theme.name===selectedTheme);
        document.querySelector(':root').style.setProperty('--backgroundColor', currentTheme.colors.backgroundColor );
        document.querySelector(':root').style.setProperty('--evenMusicTileColor', currentTheme.colors.tileColor1 );
        document.querySelector(':root').style.setProperty('--oddMusicTileColor',currentTheme.colors.tileColor2 );
        document.querySelector(':root').style.setProperty('--firstBoxShadow',currentTheme.colors.shadowColor1 );
        document.querySelector(':root').style.setProperty('--secondBoxShadow',currentTheme.colors.shadowColor2 );
    },[selectedTheme])

    //Set number of cols
    useEffect(()=>{
        document.querySelector(':root').style.setProperty('--numOfMusicTileCols', numOfMusicTileCols );
    },[numOfMusicTileCols])

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
        let tileArray = []
        for(let i=1;i<=numberOfMusicTiles;i++){
            tileArray.push(<MusicTile key={i+"-music-tile"}></MusicTile>)
        }
        return tileArray;
    }

    return (
        <div id="my-music-wrapper">
            <MusicController themeChangeCallback={handleThemeChangeCallback} songChangeCallback={handleSongChangeCallback} allTileAnimations={TILE_ANIMATIONS} allSongs={SONGS} currentTheme={selectedTheme} allThemes={THEMES} tempo = {tempo}/>
            <div id="music-tile-wrapper" className=''>
                {
                    musicTileArray
                }
            </div>
        </div>
    )
}

export default MyMusic;

