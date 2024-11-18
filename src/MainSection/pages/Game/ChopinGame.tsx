import React from 'react'
import NotesChopinDown from './GameComponents/Board/NotesChopinDown'


import { BallKeyboard } from './GameComponents/GameController/BallKeyboard'

export default function ChopinGame() {
  return (
    <div>
        <NotesChopinDown />
        <BallKeyboard />
    </div>
  )
}
