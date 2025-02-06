const canvas =document.querySelector('canvas');
canvas.width=1024;
canvas.height=576;
// This Gonna Gives us 16:9 Ratio Perfect
const context=canvas.getContext('2d');
console.log(canvas);
// context.fillStyle='white';
context.fillRect(0,0,canvas.width,canvas.height);

// Iterate through collission for loop
let collisionMap=[];
for(let i=0;i<collision.length;i=i+70)
{
    collisionMap.push(collision.slice(i,i+70));
}

// console.log(collisionMap);


let battleZonesMap=[];
for(let i=0;i<battleZonesData.length;i=i+70)
{
    battleZonesMap.push(battleZonesData.slice(i,i+70));
}
console.log(battleZonesMap);

class Boundary{
    static width=48;
    static height=48;
    constructor({position})
    {
        this.position=position
        this.width=48
        this.height=48 // we have imported 400% map

    }
    draw()
    {
        context.fillStyle='red';
        context.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
}
const offset={
    x:-750,
    y:-550
}
// Ye smjho
const boundaries=[]
collisionMap.forEach((row,i)=>{
    row.forEach((s,j)=>{
        if(s===1025){
        boundaries.push (new Boundary(
            {
                position:{
                    x:j*Boundary.width+offset.x,
                    y:i*Boundary.height+offset.y,
                }
            }
        ))
    }
})
})
console.log(boundaries);

let battleZones=[];
battleZonesMap.forEach((row,i)=>{
    row.forEach((s,j)=>{
        if(s===1025){
        battleZones.push (new Boundary(
            {
                position:{
                    x:j*Boundary.width+offset.x,
                    y:i*Boundary.height+offset.y,
                }
            }
        ))
    }
})
})
console.log("battle");
console.log(battleZones);



// X Position hoti phli and 2nd Y position 3rd pos kitna white 4th pos kitni height

const image=new Image();
image.src='./Images/PelletTown1.png'; 
console.log(image);

const playerImage=new Image();
playerImage.src='./Images/playerDown.png';

const fore= new Image();
fore.src='./Images/Foreground1.png'

const playerUp=new Image();
playerUp.src='./Images/playerUp.png';

const playerLeft=new Image();
playerLeft.src='./Images/playerLeft.png';

const playerRight=new Image();
playerRight.src='./Images/playerRight.png';
// context.drawImage(image,0,0);
// This will not display in this way because image is 
// large in size and takes lot of time to load

class Sprite{
    constructor( {position,image,frames={ max:1 },Sprites})
    {
        this.position=position;
        this.image = image;
        this.frames={...frames,val :0,elapsed:0};
        this.image.onload=()=>{
            this.width=this.image.width/this.frames.max;
            this.height=this.image.height;
        }
        this.moving=false;
        this.Sprites=Sprites;
    }
    draw()
    {
        // context.drawImage(this.image,this.position.x,this.position.y); issue was here
        context.drawImage(
            this.image,
            this.frames.val*this.width,                          // Source x
            0,                          // Source y
            this.image.width/this.frames.max,          // Source width
            this.image.height,         // Source height
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,          // Destination width
            this.image.height         // Destination height
        );
        if(this.moving)
        {
        if(this.frames.max>1)
        {
            this.frames.elapsed++;
        }
        if(this.frames.elapsed%10===0)
        {
            if(this.frames.val<this.frames.max-1)
                {
                    this.frames.val++;
                }
                else{
                    this.frames.val=0;
                }
        }
    }
}
}



// canvas.width / 2 - this.image.width / 4, // Destination x
// canvas.height / 2 - this.image.height / 2 + 80, // Destination y
const background=new Sprite(
    {
        position:{
            x:offset.x,
            y:offset.y
        },
        image:image
    }
)
const foreground=new Sprite(
    {
        position:{
            x:offset.x,
            y:offset.y
        },
        image:fore
    }
)
const pW=192; //player width
const pH=68; //player height
const player=new Sprite(
    {
        position:{
            x:canvas.width / 2 - pW /8,
            y:canvas.height / 2 - pH / 2 + 80
        },
        image:playerImage,
        frames:{
            max:4,
        },
        Sprites:{
            up: playerUp,
            left:playerLeft,
            right:playerRight,
            down:playerImage,
        }
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

const movables=[background,...boundaries,foreground,...battleZones]
function rectCollision({rect1,rect2})
{
    return ((rect1.position.x+rect1.width>=rect2.position.x) && 
        (rect1.position.x<=rect2.position.x+rect2.width) &&
        (rect1.position.y<=rect2.position.y+rect2.height) &&
        (rect1.position.y+rect1.height>=rect2.position.y)
    )
}
const battle={
    initiated:false,
}
function animate() // Ye function Bahut Imp role play krega
{
    window.requestAnimationFrame(animate);
    // context.drawImage(image,-750,-550);
    background.draw();
    boundaries.forEach((boundary)=>{
        boundary.draw();
    })
    battleZones.forEach((b)=>{
        b.draw();
    })
    // testBoundary.draw();
    player.draw();
    foreground.draw();
    // check collission
    // if((player.position.x+player.width>=testBoundary.position.x) && 
    //     (player.position.x<=testBoundary.position.x+testBoundary.width) &&
    //     (player.position.y<=testBoundary.position.y+testBoundary.height) &&
    //     (player.position.y+player.height>=player.position.y)
    // )
    // {
    //     console.log("collide");
    // }
    if(battle.initiated){
        return;
    }
    if(keys.w.pressed||keys.d.pressed||keys.a.pressed||keys.s.pressed)
    {
        for(let i=0;i<battleZones.length;i++)
            {
                const battleZone=battleZones[i];
                const overLapArea=(Math.min(player.position.x+player.width,battleZone.position.x+battleZone.width)
                -Math.max(player.position.x,battleZone.position.x))*
                (Math.min(player.position.y+player.height,battleZone.position.y+battleZone.height)
                -Math.max(player.position.y,battleZone.position.y));
                if(rectCollision({rect1:player,
                    rect2:battleZone
                }
                )&& overLapArea>(player.width*player.height)/2 && Math.random()<0.04
                )
                    {
                        battle.initiated=true;
                        console.log("colide bz");
                        break;
                    }
            }
    }

    let moving=true;
    player.moving=false;
    if(keys.w.pressed)
        {       
            player.moving=true;
            player.image=player.Sprites.up;
            for(let i=0;i<boundaries.length;i++)
                {
                    const boundary=boundaries[i];
                    if(rectCollision({rect1:player,rect2:{...boundary,position:{
                        x:boundary.position.x,
                        y:boundary.position.y+3
                    }}}))
                        {
                            console.log("colide");
                            moving=false
                            break;
                        }
                }
            if(moving)
            {
                movables.forEach((movable)=>{
                    movable.position.y+=3;
                })
            }
        } 
    if(keys.d.pressed)
        {
            player.moving=true;
            player.image=player.Sprites.right;
            for(let i=0;i<boundaries.length;i++)
            {
                const boundary=boundaries[i];
                if(rectCollision({rect1:player,rect2:{...boundary,position:{
                    x:boundary.position.x-3,
                    y:boundary.position.y
                }}}))
                    {
                        console.log("colide");
                        moving=false;
                        break;
                    }
            }
            if(moving)
            {
                movables.forEach((movable)=>{
                    movable.position.x-=3;
                })
            }
           
        }  
    if(keys.a.pressed)
    {   
        player.moving=true;
        player.image=player.Sprites.left;
        for(let i=0;i<boundaries.length;i++)
            {
                const boundary=boundaries[i];
                if(rectCollision({rect1:player,rect2:{...boundary,position:{
                    x:boundary.position.x+3,
                    y:boundary.position.y
                }}}))
                    {
                        console.log("colide");
                        moving=false;
                        break;
                    }
            }
            if(moving)
            {
                movables.forEach((movable)=>{
                    movable.position.x+=3;
                })
            }
    }
    if(keys.s.pressed)
    {
        player.moving=true;
        player.image=player.Sprites.down;
        for(let i=0;i<boundaries.length;i++)
            {
                const boundary=boundaries[i];
                if(rectCollision({rect1:player,rect2:{...boundary,position:{
                    x:boundary.position.x,
                    y:boundary.position.y-3
                }}}))
                    {
                        console.log("colide");
                        moving=false;
                        break;
                    }
            }
            if(moving)
            {
                movables.forEach((movable)=>{
                    movable.position.y-=3;
                })
            }
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
        case 'W':
            keys.w.pressed=true;
            break;
        case 'A':
            keys.a.pressed=true;
            break;
        case 'S':
            keys.s.pressed=true;
            break;
        case 'D':
            keys.d.pressed=true;

    }

})


window.addEventListener('keyup',(e)=>{
    switch(e.key)
    {
        case 'w':
            keys.w.pressed=false;
            // player.moving=false;
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



