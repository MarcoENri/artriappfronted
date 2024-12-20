import React from 'react'
import NotesMozartDown from './GameComponents/Board/NotesMendoza'

import { BallKeyboard } from './GameComponents/GameController/BallKeyboard'
import NotesMendoza from './GameComponents/Board/NotesMendoza'

export default function Mendoza() {
  return (
    <div>
        <NotesMendoza />
        <BallKeyboard />
    </div>
  )
}
