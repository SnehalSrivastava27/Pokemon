const canvas =document.querySelector('canvas');
canvas.width=1024;
canvas.height=576;
// This Gonna Gives us 16:9 Ratio Perfect
const context=canvas.getContext('2d');
console.log(canvas);
context.fillStyle='white';
context.fillRect(0,0,canvas.width,canvas.height);
// X Position hoti phli and 2nd Y position 3rd pos kitna white 4th pos kitni height

const image=new Image();
image.src='./Images/PelletTown1.png'; 
console.log(image);

const playerImage=new Image();
playerImage.src='./Images/playerDown.png';
// context.drawImage(image,0,0);
// This will not display in this way because image is 
// large in size and takes lot of time to load

class Sprite{
    constructor( {position,velocity,image})
    {
        this.position=position;
        this.image = image;
    }
    draw()
    {
        context.drawImage(this.image,this.position.x,this.position.y);
    }
}
const background=new Sprite(
    {
        position:{
            x:-750,
            y:-550
        },
        image:image
    }
)

// image.onload=()=>{
//     context.drawImage(image,-750,-550);
//     context.drawImage(
//         playerImage,
//         0,                          // Source x
//         0,                          // Source y
//         playerImage.width/4,          // Source width
//         playerImage.height,         // Source height
//         canvas.width / 2 - playerImage.width / 4, // Destination x
//         canvas.height / 2 - playerImage.height / 2, // Destination y
//         playerImage.width/4,          // Destination width
//         playerImage.height          // Destination height
//     );    
// }
//playerImage,0,0,0,0 ye 0 0 image crop ke liye h

let backgroundImageX=-750;
let playerImageX=-750;


const keys={
    w:{
        pressed:false
    },
    a:
    {
        pressed:false
    },
    d:
    {
        pressed:false
    },
    s:{
        pressed:false
    }

}




function animate() // Ye function Bahut Imp role play krega
{
    window.requestAnimationFrame(animate);
    // context.drawImage(image,-750,-550);
    background.draw();
    context.drawImage(
        playerImage,
        0,                          // Source x
        0,                          // Source y
        playerImage.width/4,          // Source width
        playerImage.height,         // Source height
        canvas.width / 2 - playerImage.width / 4, // Destination x
        canvas.height / 2 - playerImage.height / 2, // Destination y
        playerImage.width/4,          // Destination width
        playerImage.height          // Destination height
    ); 
    if(keys.w.pressed)
        {
            background.position.y=background.position.y+3;
        } 
    if(keys.d.pressed)
        {
            background.position.x=background.position.x-3;
        }  
    if(keys.a.pressed)
    {
        background.position.x=background.position.x+3;
    }
    if(keys.s.pressed)
    {
        background.position.y=background.position.y-3;
    }
}
animate();
window.addEventListener('keydown',(e)=>{
    switch(e.key)
    {
        case 'w':
            keys.w.pressed=true;
            break;
        case 'a':
            keys.a.pressed=true;
            break;
        case 's':
            keys.s.pressed=true;
            break;
        case 'd':
            keys.d.pressed=true;
            break;
    }

})


window.addEventListener('keyup',(e)=>{
    switch(e.key)
    {
        case 'w':
            keys.w.pressed=false;
            break;
        case 'a':
            keys.a.pressed=false;
            break;
        case 's':
            keys.s.pressed=false;
            break;
        case 'd':
            keys.d.pressed=false;
            break;
    }

})