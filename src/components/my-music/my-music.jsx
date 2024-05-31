import '../../styles/home.css';
import '../../styles/my-music/my-music.css';
import MusicTile from "./components/music-tile.jsx";
import MusicController from "./components/music-controller.jsx";
import { useEffect, useState } from "react";
import { THEMES } from "../../constants/music/themes.ts";
import { SONGS } from '../../constants/music/songs.ts';
import { debounce } from 'lodash';

function MyMusic() {
    const [numOfMusicTileCols, setNumOfMusicTileCols] = useState(getNumberOfCols());
    const [numberOfMusicTiles, setNumberOfMusicTiles] = useState(getNumberOfTiles());
    const [selectedTheme, setSelectedTheme] = useState(THEMES[0].name);
    const [musicTileArray, setTileArray] = useState(getTileGrid());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleResize = debounce(() => {
            //set timeout is to allow tile to resize first
            setTimeout(()=>{
                const numberOfCols = getNumberOfCols();
                const numberOfTiles = getNumberOfTiles(numberOfCols);
                setNumOfMusicTileCols(numberOfCols);
                setNumberOfMusicTiles(numberOfTiles);
            },100)
        }, 100);
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const currentTheme = THEMES.find((theme) => theme.name === selectedTheme);
        if (currentTheme) {
            document.documentElement.style.setProperty('--backgroundColor', currentTheme.colors.backgroundColor);
            document.documentElement.style.setProperty('--evenMusicTileColor', currentTheme.colors.tileColor1);
            document.documentElement.style.setProperty('--oddMusicTileColor', currentTheme.colors.tileColor2);
            document.documentElement.style.setProperty('--firstBoxShadow', currentTheme.colors.shadowColor1);
            document.documentElement.style.setProperty('--secondBoxShadow', currentTheme.colors.shadowColor2);
        }
    }, [selectedTheme]);

    useEffect(() => {
        document.documentElement.style.setProperty('--numOfMusicTileCols', numOfMusicTileCols);
        setTileArray(getTileGrid());
    }, [numOfMusicTileCols, numberOfMusicTiles]);

    function handleSongChangeCallback() {
        const wrapper = document.getElementById('music-tile-wrapper');
        wrapper.classList.remove('animation');
        setTimeout(() => {
            wrapper.classList.add('animation');
        });
    }

    function handleThemeChangeCallback(themeName) {
        setSelectedTheme(themeName);
    }

    function getTileGrid() {
        return Array.from({ length: numberOfMusicTiles }, (_, i) => (
            <MusicTile key={i + "-music-tile"} />
        ));
    }

    function getNumberOfCols() {
        if (window.innerWidth < 600) {
            return 5;
        } else if (window.innerWidth < 1200) {
            return 5;
        } else {
            return 7;
        }
    }

    function getNumberOfTiles(cols = numOfMusicTileCols) {
        const tileHeight = document.querySelector('.music-tile')?.clientHeight || 100; // Default to 100 if not rendered yet
        return Math.ceil(window.innerHeight / tileHeight) * cols;
    }

    const handleLoadingIconCallback = (isLoading) => {
        setLoading(isLoading);
    };

    return (
        <div id="my-music-wrapper">
            <MusicController 
                themeChangeCallback={handleThemeChangeCallback}
                songLoadingIconCallback={handleLoadingIconCallback}
                songChangeCallback={handleSongChangeCallback}
                allSongs={SONGS}
                currentTheme={selectedTheme}
                allThemes={THEMES}
            />
            {true && <div className="background"><h1 className='loading-spinner'>Loading...</h1></div>}
            <div id="music-tile-wrapper" className="animation paused">
                {musicTileArray}
            </div>
        </div>
    );
}

export default MyMusic;