import React from 'react'
import NotesDown from './GameComponents/Board/NotesDown'
import { BallKeyboard } from './GameComponents/GameController/BallKeyboard'

export default function GamePage() {
  return (
    <div>
        <NotesDown />
        <BallKeyboard />
    </div>
  )
}
