import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './styles/StViewTable.css'
import { Apiurl } from "../../../HomeSection/pages/constantes/apiurl"

interface StView {
    id: number;
    date: string;
    score: number;
    songId: number;
    memberId: number;
    member: string;
    song: string;
}

export default function StatisticsPage() {
    const storedData = localStorage.getItem('dataUser');
    const newDataUser = storedData ? JSON.parse(storedData) : null;

    if (!newDataUser) return <p>Error: No hay datos de usuario.</p>;

    const statisticsURL = `${Apiurl}/api/v1/statistics/member/${newDataUser.userId}`;
    const [listStatistics, setListStatistics] = useState<StView[]>([]);

    const GetStatistics = async () => {
        try {
            const results = await axios.get(statisticsURL);
            setListStatistics(results.data);
        } catch (err) {
            console.error("Error al obtener estadísticas:", err);
        }
    };

    useEffect(() => {
        GetStatistics();
    }, []); // ✅ Solo ejecuta la petición una vez

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

            {listStatistics.length > 0 ? (
                listStatistics.map((list: StView) => (
                    <div key={list.id} className="table">
                        <div className="body">
                            <div className="row">
                                <div>{list.member}</div>
                                <div>{list.song}</div>
                                <div>{list.score}</div>
                                <div>{list.date}</div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay estadísticas disponibles.</p>
            )}
        </div>
    );
}
