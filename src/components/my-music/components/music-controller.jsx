import { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { TILE_ANIMATIONS } from "../../../constants/music/tileAnimations.ts";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";
import { MdKeyboardArrowUp } from "react-icons/md";




export default function MusicController({ allThemes, allSongs, songChangeCallback, currentTheme, themeChangeCallback, songLoadingIconCallback }) {
    const [selectedSong, setSelectedSong] = useState(allSongs[0].name)
    const [currSong, setCurrSong] = useState(new Audio(allSongs[0].audioFile))
    const [playSwitch, setPlaySwitch] = useState(false);
    const [tempo, setTempo] = useState(allSongs[0].tempo);
    const [mobileSlideUp, setMobileSlideUp] = useState(false);
    const [checkedAnimations, setCheckedAnimations] = useState(TILE_ANIMATIONS);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        allSongs.forEach(song => {
            const audio = new Audio(song.audioFile);
            audio.preload = 'auto';
        });
    }, [allSongs]);

    useEffect(()=>{
        return ()=>{
            currSong.pause();
        }
    },[currSong])
    
    useEffect(() => {
        // Cleanup function for the previous currSong
        const cleanupPreviousSong = () => {
            //currSong.pause();
        };

        // Event listeners for the new currSong
        const handleLoadingStart = () => {
            document.getElementById('music-tile-wrapper').classList.replace('play', 'paused');
            songLoadingIconCallback(true && playSwitch);
        };

        const handleLoadingEnd = () => {
            if (playSwitch)
                document.getElementById('music-tile-wrapper').classList.replace('paused', 'play');
            songLoadingIconCallback(false);
        };

        currSong.addEventListener('waiting', handleLoadingStart);
        currSong.addEventListener('loadeddata', handleLoadingEnd);
        currSong.addEventListener('canplaythrough', handleLoadingEnd);

        // Cleanup event listeners when currSong changes
        return () => {
            cleanupPreviousSong();
            currSong.removeEventListener('waiting', handleLoadingStart);
            currSong.removeEventListener('loadeddata', handleLoadingEnd);
            currSong.removeEventListener('canplaythrough', handleLoadingEnd);
        };
    }, [currSong, playSwitch, songLoadingIconCallback]);

    useEffect(() => {
        currSong.volume = volume;
    }, [volume, currSong])

    //When play switch is changed, update the tile grid, and stop/start audio
    useEffect(() => {
        document.getElementById('music-tile-wrapper').classList.replace(playSwitch ? 'paused' : 'play', playSwitch ? 'play' : 'paused');
        playSwitch ? currSong.play() : currSong.pause();
    }, [playSwitch])

    useEffect(() => {
        document.querySelector(':root').style.setProperty('--tempo', tempo);
    }, [tempo])

    useEffect(() => {
        const currentSong = allSongs.find((song) => song.name === selectedSong);
        currSong.pause();
        const newAudio = new Audio(currentSong.audioFile);
        newAudio.preload = 'auto'; // Preload the selected song
        setCurrSong(newAudio);
        setTempo(currentSong.tempo);
        songChangeCallback(currSong.tempo);
        setPlaySwitch(false);
    }, [selectedSong])

    useEffect(() => {
        const appliedNormalAnimationsArr = checkedAnimations.filter(animation => (animation.isOn && !animation.transformSequence));

        const appliedAnimations = appliedNormalAnimationsArr.map(animation => animation.name).concat(['combinedTransforms']).join(', ');
        const animationIterationCount = appliedNormalAnimationsArr.map(animation => animation.iterationCount).concat(['infinite']).join(', ');
        const animationDurations = appliedNormalAnimationsArr.map(animation => animation.duration).concat(['calc(((60000ms * (1/var(--tempo))))*2)']).join(', ');
        const animationTimingFunction = appliedNormalAnimationsArr.map(animation => animation.timingFunction).concat(['cubic-bezier(0.165, 0.84, 0.44, 1)']).join(', ');

        const combinedTransformArr = checkedAnimations.filter(animation => (animation.isOn && animation.transformSequence));

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
    }, [checkedAnimations])

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
                <ListGroup.Item action className={"selectorList" + (theme.name === currentTheme ? ' active' : '')} variant="dark" key={theme.name} onClick={() => themeChangeCallback(theme.name)}>
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
                <ListGroup.Item action className={"selectorList" + (song.name === selectedSong ? ' active' : '')} variant="dark" key={song.name} onClick={() => setSelectedSong(song.name)}>
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
                    className="selectorList br-0"
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
        <div id="music-animation-ctrl-wrapper" className={(mobileSlideUp?' mb-0 open' : '')}>
            <button onClick={() => setMobileSlideUp(!mobileSlideUp)} className="mobile-more-btn"><MdKeyboardArrowUp className={"arrow-icon " + (mobileSlideUp ? 'arrow-icon-upside-down' : '')} /></button>
            <div id="music-ctrl-wrapper">
                <img className='song-img music-ctrl' src={(allSongs.find((song) => song.name === selectedSong)).imageUrl} alt="" />
                <span className="music-ctrl song-title">{selectedSong}</span>
                <div className=" music-ctrl play-pause-container">
                    <input checked={!playSwitch} onChange={() => setPlaySwitch(!playSwitch)} type="checkbox" className="playpause-chk" id="chkbx" />
                    <label htmlFor="chkbx"></label>
                </div>
                <div className="volume-wrapper">
                    {volume > 0 ? <FaVolumeUp onClick={() => setVolume(0)} className="volume-icon" /> : <FaVolumeMute onClick={() => setVolume(.5)} className="volume-icon" />}
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
            </div>
            <div className='selector-wrapper'>
                <div className="selector-list-wrapper">
                    <div className="selector-title">Select Theme</div>
                    <ListGroup className='selector'>
                        {getThemes()}
                    </ListGroup>
                </div>
                <div className="selector-list-wrapper">
                    <div className="selector-title">Select Song</div>
                    <ListGroup className="selector">
                        {getSongs()}
                    </ListGroup>
                </div>
                <div className="selector-list-wrapper">
                    <div id="selector-title-animation" className="selector-title">Select Animations</div>
                    <div className="selector">
                        <div className="selector-animation-wrapper">
                            {
                                getTileAnimations()
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}