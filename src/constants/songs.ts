import { Song } from "../models/song";
//SONG ASSETS
const thePark =require("../assets/music-assets/music-audio/the_park_80_bpm.wav");
const homeSweetHome = require('../assets/music-assets/music-audio/home_sweet_home_80_bpm.wav');

//IMAGE ASSETS
const theParkImage = require('../assets/music-assets/song-images/the_park_cover_img.png');
const homeSweetHomeImage = require('../assets/music-assets/song-images/home_sweet_home_img.jpg')

export const SONGS:Song[] = [
    {
        name: 'The Park',
        audioFile: thePark,
        tempo: 80,
        imageUrl: theParkImage
    },
    {
        name: "Home Sweet Home Cover",
        audioFile: homeSweetHome,
        tempo: 80,
        imageUrl: homeSweetHomeImage
    }
]