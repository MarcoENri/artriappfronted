import React from 'react'
import NotesMozartDown from './GameComponents/Board/NotesMozartDown'

import { BallKeyboard } from './GameComponents/GameController/BallKeyboard'

export default function MozartGame() {
  return (
    <div>
        <NotesMozartDown />
        <BallKeyboard />
    </div>
  )
}
