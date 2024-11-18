import * as _ from 'lodash-es';
import { BallKey } from './BallKey';
import './styles/BallKeyboard.css';
import React, { useState, useEffect } from 'react';
import { BALL_TO_NOTE, NOTES, VALID_NOTES } from './notes/constantNotes';

const BallKeyboard = () => {
  const [pressedBall, setPressedBall] = useState<string[]>([]);

  // const playNote = (note: any) => {
  //   if (!_.isEmpty(note)) {
  //  const noteAudio = new Audio(`/src/MainSection/notes/${note}.mp3`);
  //     // noteAudio.play()
  //     return
  //   }
  
  // };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }
    const note = event.key;
    const updatedPressedBalls = [...pressedBall];
    if (!updatedPressedBalls.includes(note) && VALID_NOTES.includes(note)) {
      updatedPressedBalls.push(note);   
      // playNote(BALL_TO_NOTE[note]);
    }
    setPressedBall(updatedPressedBalls);
 
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const index = pressedBall.indexOf(event.key);
    if (index > -1) {
      setPressedBall(state => state.filter((_, i) => i !== index));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [pressedBall]);

  const keys = _.map(NOTES, (note, index) => {
    return <BallKey key={index} note={note} pressedBall={pressedBall} />;
  });

  // const audioFiles = _.map(NOTES, (note, index) => {
  //   return (
  //     <audio id={note} key={index} />
  //   );
  // });

  return (
    <div>
      <div className='ballKeyboard'>{keys}</div>
      {/* <div>{audioFiles}</div> */}
    </div>
  );
};

export { BallKeyboard };