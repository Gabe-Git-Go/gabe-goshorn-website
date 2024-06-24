import { Song } from "../../models/my-music/song";
//SONG ASSETS
const thePark =require("../../assets/music-assets/music-audio/the_park_80_bpm.wav");
const homeSweetHome = require('../../assets/music-assets/music-audio/Home_Sweet_Home_Final.wav');
const creepin = require('../../assets/music-assets/music-audio/creepin_130_bpm.wav');

//IMAGE ASSETS
const theParkImage = require('../../assets/music-assets/song-images/the_park_cover_img.png');
const homeSweetHomeImage = require('../../assets/music-assets/song-images/home_sweet_home_img.jpg')
const creepinImage = require('../../assets/music-assets/song-images/creepin_img_cover.png')

export const SONGS:Song[] = [
    {
        name: "Home Sweet Home Cover",
        audioFile: homeSweetHome,
        tempo: 80,
        imageUrl: homeSweetHomeImage
    },
    {
        name: 'The Park',
        audioFile: thePark,
        tempo: 80,
        imageUrl: theParkImage
    },
    {
        name: "Creepin",
        audioFile: creepin,
        tempo: 130,
        imageUrl: creepinImage
    }
]