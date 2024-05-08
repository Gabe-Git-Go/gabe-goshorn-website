import { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { TILE_ANIMATIONS } from "../../../constants/tileAnimations.ts";


export default function MusicController({allThemes, allAnimations, allSongs,songChangeCallback, currentTheme, themeChangeCallback, animationChangeCallback}){
    const [selectedSong,setSelectedSong] = useState(allSongs[0].name)
    const [currSong,setCurrSong] = useState(new Audio(allSongs[0].audioFile))
    const [playSwitch, setPlaySwitch] = useState(false);
    const [tempo, setTempo] = useState(allSongs[0].tempo);
    const [mobileSlideUp,setMobileSlideUp] = useState(false);
    const [checkedAnimations,setCheckedAnimations] = useState(TILE_ANIMATIONS);

    useEffect(()=>{

        return ()=>{
            //currSong.pause();
        }
    })

    useEffect(()=>{

    },[checkedAnimations])

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

    function handleTileAnimationChange(event){
        let animationNames = '';
        let animationDurations = '';
        let animationIterationCounts = '';
        let animationTimingFunctions = '';
        const updatedCheckedAnimations = checkedAnimations.map((animation)=>{
            return animation.name === event.target.name ? { ...animation, isOn: !animation.isOn } : animation
        });
        updatedCheckedAnimations.forEach((animation)=>{
            if(animation.isOn){
                animationNames += ` ${animation.name},`;
                animationDurations += ` ${animation.duration},`;
                animationIterationCounts += ` ${animation.iterationCount},`;
                animationTimingFunctions += ` ${animation.timingFunction},`;
            }
        })

        document.querySelector(':root').style.setProperty('--appliedAnimations', animationNames.slice(0,animationNames.length-1) );
        document.querySelector(':root').style.setProperty('--animationIterationCount', animationIterationCounts.slice(0,animationIterationCounts.length-1) );
        document.querySelector(':root').style.setProperty('--animationDurations', animationDurations.slice(0,animationDurations.length-1) );
        document.querySelector(':root').style.setProperty('--animationTimingFunction', animationTimingFunctions.slice(0,animationTimingFunctions.length-1) );
        setCheckedAnimations(updatedCheckedAnimations);
    }

    function getThemes(){
        let themeOptions = [];
        allThemes.forEach((theme)=>{
            themeOptions.push(
            <ListGroup.Item action className={"themeList"+ (theme.name===currentTheme?' active':'')} variant="dark" key={theme.name} onClick={()=>themeChangeCallback(theme.name)}>
                {theme.name}
            </ListGroup.Item>
            )
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
    function getTileAnimations(){
        let tileAnimationOptions = [];
        checkedAnimations.forEach((animation)=>{
            tileAnimationOptions.push(
                <Form.Check 
                key={animation.name}
                type='checkbox'
                name={animation.name}
                className="themeList"
                id={animation.name}
                label={animation.name}
                checked={animation.isOn}
                onChange={handleTileAnimationChange}
              />
            )
        })
        return tileAnimationOptions;
    }
    
    return (
    <div className={'music-ctrl-wrapper' + (mobileSlideUp?' mb-0 ':'')}>
        <button onClick={()=>setMobileSlideUp(!mobileSlideUp)} className="mobile-more-btn">^</button>
        <img className='song-img music-ctrl' src={(allSongs.find((song)=>song.name===selectedSong)).imageUrl} alt="" />
        <span className="music-ctrl song-title">{selectedSong}</span>
        <div className=" music-ctrl play-pause-container">
            <input checked={!playSwitch} onChange={()=>setPlaySwitch(!playSwitch)} type="checkbox" className="playpause-chk"  id="chkbx"/>
            <label htmlFor="chkbx"></label>
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
            <div className="selector">
                <h6>Select Animations</h6>
                {
                    getTileAnimations()
                }
            </div>
                
        </div>
    </div>
    )
}