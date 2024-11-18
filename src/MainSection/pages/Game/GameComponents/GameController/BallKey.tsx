import * as React from 'react';
import * as _ from 'lodash-es';

import './styles/BallKey.css'
import { NOTE_TO_BALL } from './notes/constantNotes';

type Props = {
  note: string;
  pressedBall: string[];
};

class BallKey extends React.Component<Props> {

  
  keyIsPressed = (note: string, pressedBall: string[]) => {
    return _.includes(pressedBall, NOTE_TO_BALL[note]);
  }
  
  render() {
    let keyClassName = "key";

    const keyIsPressed = this.keyIsPressed(this.props.note, this.props.pressedBall);

    if (keyIsPressed) {
      keyClassName += " pressed";
    }
  
    let key;

    key = (
        <div className={keyClassName} >
          <div className="key-text">{this.props.note.toUpperCase()}</div>
        </div>
      );
    // 
    return key;
  }
}

export { BallKey };