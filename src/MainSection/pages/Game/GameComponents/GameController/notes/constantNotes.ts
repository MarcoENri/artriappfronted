interface notes{
    [key:string]:string
}

const NOTES:string[]=[
    'A','B','C','D'
]

const BALL_TO_NOTE:notes={
    a:'A',
    s:'B',
    d:'C',
    f:'D'

}

const NOTE_TO_BALL:notes={
    A:'a',
    B:'s',
    C:'d',
    D:'f'


}

const VALID_NOTES:string[] = ['a','s','d','f']
export {
    NOTES,
    VALID_NOTES,
    NOTE_TO_BALL,
    BALL_TO_NOTE
}