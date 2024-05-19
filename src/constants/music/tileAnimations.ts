import { CssAnimation } from "../../models/my-music/cssAnimation";

export const TILE_ANIMATIONS: CssAnimation[]= [
    {
        displayName: 'Color Switch',
        name: 'colorChange',
        duration: 'calc((60000ms * (1/var(--tempo))))',
        iterationCount: 'infinite',
        timingFunction: 'steps(2,jump-none)',
        isOn: true
    },    
    {
        displayName: 'Glow',
        name: 'glow',
        duration: 'calc((60000ms * (1/var(--tempo))))',
        iterationCount: 'infinite',
        timingFunction: 'linear',
        isOn: true
    },
    {
        displayName: 'Square to Circle',
        name: 'squareToCircle',
        duration: 'calc(((60000ms * (1/var(--tempo)))))',
        iterationCount: 'infinite',
        timingFunction: 'linear',
        isOn: false
    },    
    {
        displayName: 'Pulsate',
        name: 'pulsate',
        duration: 'calc((60000ms * (1/var(--tempo))))',
        iterationCount: 'infinite',
        timingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        isOn: true,
        transformSequence: {   
            start: "scale(1)",
            middle: "scale(1.2)",
            end: "scale(1)"
        }
    },    
    {
        displayName: '360Rotate',
        name: 'rotate',
        duration: 'calc(((60000ms * (1/var(--tempo))))*2)',
        iterationCount: 'infinite',
        timingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        isOn: false,
        transformSequence: {   
            start: "rotate(0deg)",
            middle: "rotate(180deg)",
            end: "rotate(360deg)"
        }
    },
    {
        displayName: 'Slide right -> left',
        name: 'slide',
        duration: 'calc(((60000ms * (1/var(--tempo))))*2)',
        iterationCount: 'infinite',
        timingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        isOn: false,
        transformSequence: {   
            start: "translateX(0%)",
            middle: "translateX(50%)",
            end: "translateX(100%)"
        }
    },
    {
        displayName: 'Flip',
        name: 'flip',
        duration: 'calc((60000ms * (1/var(--tempo)))*2)',
        iterationCount: 'infinite',
        timingFunction: 'ease-in-out',
        isOn: true,
        transformSequence: {   
            start: "rotateY(0deg)",
            middle: "rotateY(180deg)",
            end: "rotateY(360deg)"
        }
    }
]