export function generateRandomColor(){
    return `rgba(${Math.floor(Math.random() * 255)}, 
                ${Math.floor(Math.random() * 255)}, 
                ${Math.floor(Math.random() * 255)},
                ${Math.random() +.25}`;
}

