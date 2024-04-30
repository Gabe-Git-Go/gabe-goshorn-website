import playBtn from '../../../assets/music-assets/music-ctrl-images/play_button.png'
import playBtnPressed from '../../../assets/music-assets/music-ctrl-images/play_button_pressed.png'
import pauseBtn from '../../../assets/music-assets/music-ctrl-images/pause_button.png'
import pauseBtnPressed from '../../../assets/music-assets/music-ctrl-images/pause_button_pressed.png'
import { useEffect, useState } from "react";

export default function MusicController({allThemes, allSongs,songChangeCallback, theme, themeChangeCallback}){
    const [isPauseBtnPressed,setPauseBtnPressed] = useState(false);
    const [selectedSong,setSelectedSong] = useState(allSongs[0].name)
    const [currSong,setCurrSong] = useState(new Audio(allSongs[0].audioFile))
    const [playSwitch, setPlaySwitch] = useState(false);
    const [tempo, setTempo] = useState(allSongs[0].tempo)

    //When play switch is changed, update the tile grid, and stop/start audio
    useEffect(()=>{
        document.getElementById('music-tile-wrapper').className = document.getElementById('music-tile-wrapper').className.replace(playSwitch?'paused':'play','');
        document.getElementById('music-tile-wrapper').className += ` ${playSwitch?'play':'paused'}`;
    },[playSwitch])

    useEffect(()=>{
        const currentSong = allSongs.find((song)=>song.name===selectedSong);
        currSong.pause();
        setCurrSong(new Audio(currentSong.audioFile));
        setTempo(currentSong.tempo);
        songChangeCallback(currSong.tempo);
        document.querySelector(':root').style.setProperty('--tempo', tempo);
        setPlaySwitch(false);
    },[selectedSong])


    function switchPlay(isOn){
        if(!isOn){
            setPauseBtnPressed(true);
            setTimeout(()=>{
                setPauseBtnPressed(false);
            },500)
        }
        setPlaySwitch(isOn);  
    }

    function getThemes(){
        let themeOptions = [];
        allThemes.forEach((theme)=>{
            themeOptions.push(<option key={theme.name} value={theme.name}>{theme.name}</option>)
        })
        return themeOptions;
    }
    function getSongs(){
        let songOptions = [];
        allSongs.forEach((song)=>{
            songOptions.push(<option key={song.name} value={song.name}>{song.name}</option>)
        })
        return songOptions;
    }
    return (
        <div className="music-ctrl-wrapper">
        <img className={"music-ctrl"} id= "play-btn" onClick={ () =>switchPlay(true)} src={playSwitch?playBtnPressed:playBtn} alt="Play Button" />
        <img className={"music-ctrl"} id = "pause-btn" onClick={ () =>switchPlay(false)} src={isPauseBtnPressed?pauseBtnPressed:pauseBtn} alt="Pause Buttton" />
        <span className="music-ctrl song-title">N o w P la ying...</span>
        <label htmlFor="themeSelector">
            <select value={theme} onChange={e => themeChangeCallback(e.target.value)} name="themeSelector" id="">
                {getThemes()}
            </select>
        </label>
        <label htmlFor="songSelector">
            <select value={selectedSong} onChange={e => setSelectedSong(e.target.value)} name="songSelector" id="">
                {getSongs()}
            </select>
        </label>
    </div>
    )
}