import React from 'react'
import NotesMozartDown from './GameComponents/Board/NotesPasacalle'

import { BallKeyboard } from './GameComponents/GameController/BallKeyboard'
import NotesPasacalle from './GameComponents/Board/NotesPasacalle'

export default function Pasacalle() {
  return (
    <div>
        <NotesPasacalle/>
        <BallKeyboard />
    </div>
  )
}
