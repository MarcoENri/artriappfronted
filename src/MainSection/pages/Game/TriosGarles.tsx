import React from 'react'
import NotesMozartDown from './GameComponents/Board/NotesTriosGarles'

import { BallKeyboard } from './GameComponents/GameController/BallKeyboard'
import NotesTriosGarles from './GameComponents/Board/NotesTriosGarles'

export default function TriosGarles() {
  return (
    <div>
        <NotesTriosGarles/>
        <BallKeyboard />
    </div>
  )
}
