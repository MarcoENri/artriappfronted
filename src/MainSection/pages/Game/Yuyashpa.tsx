import React from 'react'
import NotesMozartDown from './GameComponents/Board/NotesYuyashpa'

import { BallKeyboard } from './GameComponents/GameController/BallKeyboard'
import NotesYuyashpa from './GameComponents/Board/NotesYuyashpa'

export default function Yuyashpa() {
  return (
    <div>
        <NotesYuyashpa />
        <BallKeyboard />
    </div>
  )
}
