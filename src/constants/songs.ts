import { Song } from "../models/song";
const thePark =require("../assets/music-assets/music-audio/the_park_80_bpm.wav");
const homeSweetHome = require('../assets/music-assets/music-audio/home_sweet_home_80_bpm.wav')

export const SONGS:Song[] = [
    {
        name: 'The Park',
        audioFile: thePark,
        tempo: 80,
        imageUrl: '../assets/music-assets/song-images/the_park_cover_img.png'
    },
    {
        name: "Home Sweet Home Cover",
        audioFile: homeSweetHome,
        tempo: 80,
        imageUrl: '../assets/music-assets/song-images/home_sweet_home_img.png'
    }
]