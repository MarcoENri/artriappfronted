import React, { useRef, useEffect, useState } from "react";
import { MovNotes } from "./MovNotes";
import PlayerStats from "../PlayerStats/PlayerStats";
import data from "../../../../../../data";
import "./styles/NotesDown.css";
import PlayerSaveData from "../PlayerStats/PlayerSaveData";
import { PlayCircleOutlined } from "@ant-design/icons";


const NotesMozartDown = () => {
  let newDataUser = JSON.parse(localStorage.getItem('dataUser')!!)
  const memberId = newDataUser.userId
  const player = newDataUser.username
  const [score, setScore] = useState(0); // UseState for manage the score
  const [startGame, setStartGame] = useState(false) //Manage the start and end game
  const canvasRef = useRef<HTMLCanvasElement>(null);

  console.log(newDataUser)
  const notesForELisa = [
  new MovNotes(160, 0, canvasRef,'a','blue'),
  new MovNotes(760, 0, canvasRef,'d','orange'),
  new MovNotes(460, 0, canvasRef,'s','red'),
  new MovNotes(460, 0, canvasRef,'s','red'),
  new MovNotes(1060, 0, canvasRef,'f','yellow'),
  new MovNotes(760, 0, canvasRef,'d','orange'),
  new MovNotes(1060, 0, canvasRef,'f','yellow'),
  new MovNotes(460, 0, canvasRef,'s','red'),
  new MovNotes(160, 0, canvasRef,'a','blue'),
  new MovNotes(760, 0, canvasRef,'d','orange'),
  new MovNotes(460, 0, canvasRef,'s','red'),
  new MovNotes(460, 0, canvasRef,'s','red'),
  new MovNotes(1060, 0, canvasRef,'f','yellow'),
  new MovNotes(760, 0, canvasRef,'d','orange'),
  new MovNotes(1060, 0, canvasRef,'f','yellow'),
  new MovNotes(460, 0, canvasRef,'s','red'),
  
]

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    canvas.width = 1220;
    canvas.height = 600;

    const ctx = canvas?.getContext("2d");
    if (!ctx) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      for(let i = 0; i<notesForELisa.length;i++){
        const note = notesForELisa[i];
        if(event.key === note.key &&
          note.y > canvas.height -200 &&
          note.y < canvas.height - 30)
       {
        setScore((score) => score + 10);
        break;
      }
    };
    ctx?.clearRect(0,0, ctx.canvas?.width, ctx.canvas?.height)
  }
    let animationFrameId: any;
    const song = new Audio(`https://res.cloudinary.com/dymptobl2/video/upload/v1732115615/AngeldeLuz_ripptb.mp3`);
    document.addEventListener("keydown", handleKeyDown, true);
    if(startGame) {
          song.play()
    
    const render = () => {
      for(let i = 0; i< notesForELisa.length; i++){
        const note = notesForELisa[i];
        note.draw(ctx, 2)
        if(note.y < canvas.height + 120){
          break;
        }else if(note.y > canvas.height + 110){
          notesForELisa.splice(i,1)
        }
        if( i === notesForELisa.length - 1){
          setStartGame(false)
          song.pause()
        }
      }
   
   
      PlayerStats(ctx, player, canvas);
      animationFrameId = window.requestAnimationFrame(render);
      window.addEventListener('blur', handleStopPlaying)
    };

    const handleStopPlaying = () =>{
      if(startGame){
        song.pause()
        setStartGame(false)
      }
    }

    render();
}
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      {if(animationFrameId){
        song.pause()
      }}
      document.addEventListener("keydown", handleKeyDown, true);
    };
  }, [startGame]);
 
  return (
    <div>
      <canvas ref={canvasRef} className="gameNotes" />
      <PlayerSaveData score={score} songId={3} memberId={memberId} />
      {(!startGame)&&
      <button onClick={()=>setStartGame(true) } className='startButton'>
        <p className="startIcon"><PlayCircleOutlined /></p>
      </button> 
      }
      </div>
  );
};

NotesMozartDown.defaultProps = {
  width: 1000,
  height: 1000,
};


export default NotesMozartDown;
