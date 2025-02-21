import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StView from '../Interface/StatisticsViewInterface';
import '../styles/StView.css';

import { Apiurl } from "../../../../HomeSection/pages/constantes/apiurl";

export default function GetStatisticsView() {
    const [data, setData] = useState<StView[]>([]);
    
    // Obtener userId de localStorage
    const storedData = localStorage.getItem('dataUser');
    const newDataUser = storedData ? JSON.parse(storedData) : null;
    const userId = newDataUser?.userId;

    const findAllStatistics = async () => {
        if (!userId) {
            console.error("❌ No se encontró el userId en localStorage");
            return;
        }

        try {
            console.log(`🔍 Buscando estadísticas para el usuario: ${userId}`);
            const response = await axios.get(`${Apiurl}/api/v1/statistics/member/${userId}`);
            setData(response.data);
        } catch (error) {
            console.error("Error al obtener estadísticas:", error);
        }
    };

    useEffect(() => {
        findAllStatistics();
    }, []); // ✅ Se ejecuta solo una vez al montar el componente

    return (
        <>
            {data.length > 0 ? (
                data.map((stmember: StView) => (
                    <div key={stmember.id} className='table'>
                        <div className='row'>{stmember.member}</div>
                        <div className='row'>{stmember.song}</div>
                        <div className='row'>{stmember.date}</div>
                        <div className='row'>{stmember.score}</div>
                    </div>
                ))
            ) : (
                <p>No hay estadísticas disponibles.</p>
            )}
        </>
    );
}
