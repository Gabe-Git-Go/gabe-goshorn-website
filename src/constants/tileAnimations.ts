import { CssAnimation } from "../models/cssAnimation";

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
        displayName: 'Pulsate',
        name: 'pulsate',
        duration: 'calc((60000ms * (1/var(--tempo))))',
        iterationCount: 'infinite',
        timingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        isOn: true
    },    
    {
        displayName: '360Rotate',
        name: 'rotate',
        duration: 'calc(((60000ms * (1/var(--tempo))))*2)',
        iterationCount: 'infinite',
        timingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        isOn: true
    },
    {
        displayName: 'Slide right -> left',
        name: 'slide',
        duration: 'calc(((60000ms * (1/var(--tempo))))*2)',
        iterationCount: 'infinite',
        timingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        isOn: true
    },
    {
        displayName: 'Square to Circle',
        name: 'squareToCircle',
        duration: 'calc(((60000ms * (1/var(--tempo))))*2)',
        iterationCount: 'infinite',
        timingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        isOn: true
    }
]