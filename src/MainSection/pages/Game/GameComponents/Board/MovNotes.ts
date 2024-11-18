class MovNotes{
    x:number;
    y:number;
    key:string;
    color:string;
    // dy:number;

    constructor(x:number, y:number, canvas:any, key:string, color:string){   
        this.x = x;
        this.y =y;
        this.key = key
        this.color=color
        // this.dy = dy;

    }
    draw(ctx:any, dy:number){
        this.y+=dy
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y, 120, 0, 2*Math.PI )
        ctx.fill()
    }
    
}

export {
    MovNotes
}