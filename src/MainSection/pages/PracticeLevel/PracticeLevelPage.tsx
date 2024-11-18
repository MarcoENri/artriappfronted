import { Divider } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import MusicCard from './components/MusicCard'
import "./styles/PracticeLevelPage.css"


const musicData = [
  {
  title: 'El Aguacate', 
  description:'El aguacate es una canción en tono de pasillo compuesta por el músico ecuatoriano César Guerrero Tamayo. consiste en una declaración de amor de un hombre hacia una mujer. Es considerado uno de los pasillos más famosos y representativos de Ecuador. Entre los artistas que han interpretado el tema se cuenta a Julio Jaramillo, los Hermanos Miño Naranjo, Juan Fernando Velasco y el Dúo Benítez-Valencia.',
  link:'/artri/auth/game/1'
  },
  {
    title:'Cuando llora mi guitarra', 
    description:'Cuando llora mi guitarra, es un valse que, dicho por su creador, fue inspirada en el talento de Don Oscar Avilés escrita por el compositor Don Augusto Polo Campos e interpretada magistralmente por Julio Jaramillo Laurido, el “Ruiseñor de América”.',
    link:'/artri/auth/game/2'
  },
  {
    title:'Ángel de Luz', 
    description:'El pasillo Ángel de Luz fue compuesto en letra y música por la poetisa ecuatoriana Benigna Dávalos Villavicencio, riobambeña de nacimiento. Este pasillo es considerado su obra más reconocida dentro de este género musical. Entre los artistas que han interpretado el tema se cuenta Juan Fernando Velasco entre otros.',
    link:'/artri/auth/game/3'
  }
]

export default function PracticeLevelPage() {
  return (
      <div className='general-container'> 
        {musicData.map((music, index)=>{
          return(
            <div>
              <MusicCard name={`${musicData[index].title}`} 
              description={`${musicData[index].description}`}
              link={musicData[index].link}/>
            </div>
          )
        })}
      </div>
  )
}
