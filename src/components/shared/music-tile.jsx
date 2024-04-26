import { useEffect, useRef, useState } from "react";
import MyNavbar from "./my-navbar";

export default function MusicTile({tempo,colorGeneratorCallback,tileNumber,rowNumber,setColorSwitchCallback, isPlaying}) {
    const [tileColor,setTileColor] = useState(colorGeneratorCallback(tileNumber,rowNumber,setColorSwitchCallback));
    const beatInterval = useRef();

    //Clear interval on destruction
    useEffect(()=>{
        return () => clearInterval(beatInterval.current)
    },[])

    //Toggle play and pause
    useEffect(()=>{
        console.log("is playin" + isPlaying)
        if(isPlaying){
            playTile();
        }else{
            pauseTile();
        }
    },[isPlaying])

    //Start interval of changing tile color
    const playTile = () => {
        beatInterval.current = setInterval(()=>{
           setTileColor(colorGeneratorCallback(tileNumber,rowNumber,setColorSwitchCallback));
         },1000/(tempo/60));
    };

    //Remove interval of tile color
    const pauseTile = () => {
        clearInterval(beatInterval.current);
    };
    
    return (
    <div style={{backgroundColor: tileColor}} className="music-tile">
    </div>
    )
}
