import { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';

export default function MusicController({allThemes, allSongs,songChangeCallback, currentTheme, themeChangeCallback}){
    const [selectedSong,setSelectedSong] = useState(allSongs[0].name)
    const [currSong,setCurrSong] = useState(new Audio(allSongs[0].audioFile))
    const [playSwitch, setPlaySwitch] = useState(false);
    const [tempo, setTempo] = useState(allSongs[0].tempo);
    const [mobileSlideUp,setMobileSlideUp] = useState(false);

    //When play switch is changed, update the tile grid, and stop/start audio
    useEffect(()=>{
        document.getElementById('music-tile-wrapper').className = document.getElementById('music-tile-wrapper').className.replace(playSwitch?'paused':'play','');
        document.getElementById('music-tile-wrapper').className += ` ${playSwitch?'play':'paused'}`;
        playSwitch? currSong.play() : currSong.pause();
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

    function getThemes(){
        let themeOptions = [];
        allThemes.forEach((theme)=>{
            themeOptions.push(
            <ListGroup.Item action className={"themeList"+ (theme.name===currentTheme?' active':'')} variant="dark" key={theme.name} onClick={()=>themeChangeCallback(theme.name)}>
                {theme.name}
            </ListGroup.Item>
            )
            // <option key={theme.name} value={theme.name}>{theme.name}</option>)
        })
        return themeOptions;
    }
    function getSongs(){
        let songOptions = [];
        allSongs.forEach((song)=>{
            songOptions.push(
                <ListGroup.Item action className={"themeList"+ (song.name===selectedSong?' active':'')} variant="dark" key={song.name} onClick={()=>setSelectedSong(song.name)}>
                    {song.name}
                </ListGroup.Item>
            )
        })
        return songOptions;
    }
    
    return (
    <div className={'music-ctrl-wrapper' + (mobileSlideUp?' mb-0 ':'')}>
        <button onClick={()=>setMobileSlideUp(!mobileSlideUp)} className="mobile-more-btn">^</button>
        <img className='song-img music-ctrl' src={(allSongs.find((song)=>song.name===selectedSong)).imageUrl} alt="" />
        <span className="music-ctrl song-title">{selectedSong}</span>
        <div className=" music-ctrl play-pause-container">
            <input  type="checkbox" className="playpause-chk"  id="chkbx"/>
            <label onClick= {()=> setPlaySwitch(!playSwitch)} htmlFor="chkbx"></label>
        </div>

        <div className='selector-wrapper'>
            <ListGroup className='selector'>
                <ListGroup.Item className="selector-title">Select Theme</ListGroup.Item>
                {getThemes()}
            </ListGroup>
            <ListGroup className="selector">
                <ListGroup.Item className="selector-title">Select Song</ListGroup.Item>
                {getSongs()}
            </ListGroup>
                
        </div>
    </div>
    )
}