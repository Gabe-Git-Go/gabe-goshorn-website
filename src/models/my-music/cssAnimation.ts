export type CssAnimation = { 
    displayName: string,
    name: string,
    duration: string,
    iterationCount: string,
    timingFunction: string,
    isOn: boolean,
    transformSequence?:{
        start: string,
        middle?: string,
        end: string
    }
}