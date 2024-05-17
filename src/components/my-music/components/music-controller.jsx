import { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { TILE_ANIMATIONS } from "../../../constants/music/tileAnimations.ts";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";



export default function MusicController({ allThemes, allAnimations, allSongs, songChangeCallback, currentTheme, themeChangeCallback, animationChangeCallback }) {
    const [selectedSong, setSelectedSong] = useState(allSongs[0].name)
    const [currSong, setCurrSong] = useState(new Audio(allSongs[0].audioFile))
    const [playSwitch, setPlaySwitch] = useState(false);
    const [tempo, setTempo] = useState(allSongs[0].tempo);
    const [mobileSlideUp, setMobileSlideUp] = useState(false);
    const [checkedAnimations, setCheckedAnimations] = useState(TILE_ANIMATIONS);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        return () => {
            currSong.pause();
        }
    }, [ currSong])

    useEffect(() => {
        currSong.volume = volume;
    }, [volume, currSong])

    //When play switch is changed, update the tile grid, and stop/start audio
    useEffect(() => {
        document.getElementById('music-tile-wrapper').className = document.getElementById('music-tile-wrapper').className.replace(playSwitch ? 'paused' : 'play', '');
        document.getElementById('music-tile-wrapper').className += ` ${playSwitch ? 'play' : 'paused'}`;
        playSwitch ? currSong.play() : currSong.pause();
    }, [playSwitch])

    useEffect(() => {
        const currentSong = allSongs.find((song) => song.name === selectedSong);
        currSong.pause();
        setCurrSong(new Audio(currentSong.audioFile));
        setTempo(currentSong.tempo);
        songChangeCallback(currSong.tempo);
        document.querySelector(':root').style.setProperty('--tempo', tempo);
        setPlaySwitch(false);
    }, [selectedSong])

    useEffect(()=>{
        const appliedNormalAnimationsArr = checkedAnimations.filter(animation => (animation.isOn&&!animation.transformSequence));

        const appliedAnimations = appliedNormalAnimationsArr.map(animation => animation.name).concat(['combinedTransforms']).join(', ');
        const animationIterationCount = appliedNormalAnimationsArr.map(animation => animation.iterationCount).concat(['infinite']).join(', ');
        const animationDurations = appliedNormalAnimationsArr.map(animation => animation.duration).concat(['calc(((60000ms * (1/var(--tempo))))*2)']).join(', ');
        const animationTimingFunction = appliedNormalAnimationsArr.map(animation => animation.timingFunction).concat(['cubic-bezier(0.165, 0.84, 0.44, 1)']).join(', ');
        
        const combinedTransformArr = checkedAnimations.filter(animation => (animation.isOn&&animation.transformSequence));

        const combinedTransformStart = combinedTransformArr.map(animation => animation.transformSequence.start).join(' ');
        const combinedTransformMiddle = combinedTransformArr.map(animation => animation.transformSequence.middle).join(' ');
        const combinedTransformEnd = combinedTransformArr.map(animation => animation.transformSequence.end).join(' ');   

        document.querySelector(':root').style.setProperty('--combinedTransformStart', combinedTransformStart);
        document.querySelector(':root').style.setProperty('--combinedTransformMiddle', combinedTransformMiddle);
        document.querySelector(':root').style.setProperty('--combinedTransformEnd', combinedTransformEnd);
        document.querySelector(':root').style.setProperty('--appliedAnimations', appliedAnimations);
        document.querySelector(':root').style.setProperty('--animationIterationCount', animationIterationCount);
        document.querySelector(':root').style.setProperty('--animationDurations', animationDurations);
        document.querySelector(':root').style.setProperty('--animationTimingFunction', animationTimingFunction);
    },[checkedAnimations])

    function handleTileAnimationChange(event) {
        const updatedCheckedAnimations = checkedAnimations.map((animation) => {
            return animation.name === event.target.name ? { ...animation, isOn: !animation.isOn } : animation
        });
        setCheckedAnimations(updatedCheckedAnimations);
    }

    function getThemes() {
        let themeOptions = [];
        allThemes.forEach((theme) => {
            themeOptions.push(
                <ListGroup.Item action className={"themeList" + (theme.name === currentTheme ? ' active' : '')} variant="dark" key={theme.name} onClick={() => themeChangeCallback(theme.name)}>
                    {theme.name}
                </ListGroup.Item>
            )
        })
        return themeOptions;
    }
    function getSongs() {
        let songOptions = [];
        allSongs.forEach((song) => {
            songOptions.push(
                <ListGroup.Item action className={"themeList" + (song.name === selectedSong ? ' active' : '')} variant="dark" key={song.name} onClick={() => setSelectedSong(song.name)}>
                    {song.name}
                </ListGroup.Item>
            )
        })
        return songOptions;
    }
    function getTileAnimations() {
        let tileAnimationOptions = [];
        checkedAnimations.forEach((animation) => {
            tileAnimationOptions.push(
                <Form.Check
                    key={animation.name}
                    type='checkbox'
                    name={animation.name}
                    className="themeList "
                    id={animation.name}
                    label={animation.displayName}
                    checked={animation.isOn}
                    onChange={handleTileAnimationChange}
                />
            )
        })
        return tileAnimationOptions;
    }

    return (
        <div className={'music-ctrl-wrapper' + (mobileSlideUp ? ' mb-0 ' : '')}>
            <button onClick={() => setMobileSlideUp(!mobileSlideUp)} className="mobile-more-btn">^</button>
            <img className='song-img music-ctrl' src={(allSongs.find((song) => song.name === selectedSong)).imageUrl} alt="" />
            <span className="music-ctrl song-title">{selectedSong}</span>
            <div className=" music-ctrl play-pause-container">
                <input checked={!playSwitch} onChange={() => setPlaySwitch(!playSwitch)} type="checkbox" className="playpause-chk" id="chkbx" />
                <label htmlFor="chkbx"></label>
            </div>
            <div className="volume-wrapper">
                {volume > 0 ? <FaVolumeUp onClick={()=>setVolume(0)} className="volume-icon" /> : <FaVolumeMute onClick={()=>setVolume(.5)}  className="volume-icon" />}
                <div className="volume-range-wrapper">
                    <input
                        type="range"
                        id="volume-range"
                        min={0}
                        max={1}
                        step={0.02}
                        value={volume}
                        onChange={event => {
                            setVolume(event.target.valueAsNumber)
                        }}
                    />
                </div>
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
                <div className="selector selector-animation-wrapper">
                    <div id="selector-title-animation" className="selector-title">Select Animations</div>
                    {
                        getTileAnimations()
                    }
                </div>

            </div>
        </div>
    )
}