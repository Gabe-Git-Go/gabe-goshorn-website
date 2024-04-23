import { useEffect, useState } from "react";
import MyNavbar from "./my-navbar";

export default function MusicTile({tempo,colorGeneratorCallback,tileNumber,rowNumber,setColorSwitchCallback, isPlaying}) {
    const [musicSwitch,setMusicSwitch] = useState(true);
    const [tileColor,setTileColor] = useState(colorGeneratorCallback(tileNumber,rowNumber,setColorSwitchCallback));
    useEffect(()=>{
        if(true){
            console.log("is playing" + isPlaying)
            const interval = setInterval(()=>{
                setMusicSwitch(!musicSwitch);
                setTileColor(colorGeneratorCallback(tileNumber,rowNumber,setColorSwitchCallback));
             },1000/(tempo/60));
            
            return()=> clearInterval(interval);
        }
    },[])

    
    return (
    <div style={{backgroundColor: tileColor}} className="music-tile">
    </div>
    )
}
