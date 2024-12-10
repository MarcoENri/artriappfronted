import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './styles/StViewTable.css'

import { Apiurl } from "../../../HomeSection/pages/constantes/apiurl"

interface StView{
    id:number; 
    date:string; 
    score:number; 
    songId:number; 
    memberId:number; 
    member:string;
    song: string;     
}


export default function AdminStatisticsPage() {
    const statisticsURL = `${Apiurl}/api/v1/statistics/member/`
    const [listStatistics, setListStatistics] = useState<StView[]>([])
    const GetStatistics = async() => {
        try{
            await axios.get(statisticsURL).
            then(results=> setListStatistics(results.data))
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        GetStatistics()
    },[listStatistics])
  return (
    <div className='table-container'>
        
        <div className="title">
		<h1>Puntajes</h1>
	    </div>
	
	    <div className="header">
		<div className="row">
			<div>Nombre</div>
			<div>Canción</div>
			<div>Puntaje</div>
            <div>Fecha</div>
		</div>
	    </div>
        {listStatistics?.map((list:StView) =>(
        <div key={list.id}  className="table">
	    
	    <div className="body">
		<div className="row">

			<div>{list.member}</div>
			<div>{list.song}</div>
			<div>{list.score}</div>
            <div>{list.date}</div>
		</div>
		
	    </div>
	
        </div>

        ))}
    </div>

  )

}
