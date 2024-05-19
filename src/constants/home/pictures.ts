import { Picture } from "../../models/home/picture";

// Pictures
const gabeMountain1 = require('../../assets/home-assets/mountain_gabe.jpg');
const gabeMountain2 = require('../../assets/home-assets/mountain_gabe_2.jpg');
const gabeTulip1 = require('../../assets/home-assets/tulip_gabe.jpg');
const gabeTulip2 = require('../../assets/home-assets/tulip_gabe_2.jpg');
const tulips = require('../../assets/home-assets/tulips.jpg');
const cats = require('../../assets/home-assets/cats.jpg');
 

export const PICTURES: Picture[] = [
    {
        displayTitle: "Goose Rock Summit",
        imgFile: gabeMountain1,
        description: "Near Deception Pass in Northwest Washington there is a cool little hike you can take to get this beautiful view."
    },    
    {
        displayTitle: "Rattlesnake Ledge",
        imgFile: gabeMountain2,
        description: "Me and my wife went on the Rattlesnake ledge trail with only 2 waterbottle containers and no snacks, on a 4.5 mile trail. Needles to say it was a push, but well worth it."
    },    
    {
        displayTitle: "Looking to the sky",
        imgFile: gabeTulip1,
        description: "Felt calm and relaxed looking towards the sky with all of these beautiful flowers around me. Note: This was taken at the Skagit Valley Tulip Festival"
    },    
    {
        displayTitle: "TULIPS!!!!",
        imgFile: tulips,
        description: "Incredibly beautiful tulips all around! There at the Skagit Valley Tulip Festival"
    },
    {
        displayTitle: "Nice N' Professional",
        imgFile: gabeTulip2,
        description: "Felt clean, cool and collected."
    },    
    {
        displayTitle: "My Cats",
        imgFile: cats,
        description: "The standard issue's name is Mochi, she is the sassy one. The grey and white one's name is Monty, he is the quiet but randomly energetic one. I luvem to death."
    }
]