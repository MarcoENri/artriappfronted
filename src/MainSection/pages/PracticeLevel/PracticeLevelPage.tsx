import { Divider } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import MusicCard from './components/MusicCard';
import "./styles/PracticeLevelPage.css";

const musicData = [
  {
    title: 'El Aguacate', 
    description: 'El aguacate es una canción en tono de pasillo compuesta por el músico ecuatoriano César Guerrero Tamayo. Consiste en una declaración de amor de un hombre hacia una mujer. Es considerado uno de los pasillos más famosos y representativos de Ecuador. Entre los artistas que han interpretado el tema se cuenta a Julio Jaramillo, los Hermanos Miño Naranjo, Juan Fernando Velasco y el Dúo Benítez-Valencia.',
    link:'/artri/auth/game/1'
  },
  {
    title:'Cuando llora mi guitarra', 
    description: 'Cuando llora mi guitarra, es un valse que, dicho por su creador, fue inspirada en el talento de Don Oscar Avilés escrita por el compositor Don Augusto Polo Campos e interpretada magistralmente por Julio Jaramillo Laurido, el “Ruiseñor de América”.',
    link:'/artri/auth/game/2'
  },
  {
    title:'Ángel de Luz', 
    description: 'El pasillo Ángel de Luz fue compuesto en letra y música por la poetisa ecuatoriana Benigna Dávalos Villavicencio, riobambeña de nacimiento. Este pasillo es considerado su obra más reconocida dentro de este género musical. Entre los artistas que han interpretado el tema se cuenta Juan Fernando Velasco entre otros.',
    link:'/artri/auth/game/3'
  },
  {
    title:'Hermanas Mendoza', 
    description: 'Cuando llora mi guitarra, es un valse que, dicho por su creador, fue inspirada en el talento de Don Oscar Avilés escrita por el compositor Don Augusto Polo Campos e interpretada magistralmente por Julio Jaramillo Laurido, el “Ruiseñor de América”.',
    link:'/artri/auth/game/4'
  },
  {
    title:'Ecuador Pasacalle', 
    description: 'Este poema habla sobre el amor eterno entre dos personas a pesar de la muerte. Aunque sus cuerpos se separen, sus almas permanecerán unidas por siempre. El poeta expresa que aunque se aleje físicamente, la gente siempre lo recordará debido al profundo amor que compartió con su ser querido.',
    link:'/artri/auth/game/5'
  },
  {
    title:'Yuyashpa San Juanito', 
    description: 'El san Juanito es un ritmo muy alegre con liricas tristes, lo que provoca un contraste al escucharlo; este ritmo está interpretado con instrumentos propios de la zona de Imbabura como son el rondador, el pingullo, las flautas y los bombos.',
    link:'/artri/auth/game/6'
  },
  {
    title:'Trios Los Garles', 
    description: 'Cuando llora mi guitarra, es un valse que, dicho por su creador, fue inspirada en el talento de Don Oscar Avilés escrita por el compositor Don Augusto Polo Campos e interpretada magistralmente por Julio Jaramillo Laurido, el “Ruiseñor de América”.',
    link:'/artri/auth/game/7'
  },
  {
    title:'Julio Jaramillo', 
    description: 'Cuando llora mi guitarra, es un valse que, dicho por su creador, fue inspirada en el talento de Don Oscar Avilés escrita por el compositor Don Augusto Polo Campos e interpretada magistralmente por Julio Jaramillo Laurido, el “Ruiseñor de América”.',
    link:'/artri/auth/game/8'
  },
];

export default function PracticeLevelPage() {
  return (
    <div className='general-container'>
      {musicData.map((music, index) => (
        <div className="music-card-container" key={index}>
          <MusicCard 
            name={music.title} 
            description={music.description}
            link={music.link}
          />
        </div>
      ))}
    </div>
  );
}
