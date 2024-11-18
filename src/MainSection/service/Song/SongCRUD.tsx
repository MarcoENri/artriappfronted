import {ColumnsType} from "antd/es/table";
import useSWR from "swr";
import { Space, Table, Button, Typography  } from 'antd';
import React, {useState} from "react";
import { PlusOutlined } from '@ant-design/icons';
import Song from "./Interface/SongInterface";
import { fetchSong, song } from "./SongService/SongService";
import { SongAntDrawer } from "../../components/AntDrawer/SongAntDrawer";
import axios from "axios";

import { Apiurl } from "../../../HomeSection/pages/constantes/apiurl"

export const SongCRUD: React.FC  = () => {
    const columns: ColumnsType<Song> = [
        {
            title: 'id',
            dataIndex:'id',
            key: 'id',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Género',
            dataIndex: 'genre',
            key: 'genre'
        },
        {
            title: 'ID de miembro',
            dataIndex: 'memberId',
            key: 'memberId'
        },
        
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Typography.Link onClick={()=>fieldsEdit(record)} style={{ marginRight: 8 }}>
                        Editar
                    </Typography.Link>
                    <Typography.Link  style={{ marginRight: 8 }} onClick={()=>axios.delete(`${Apiurl}/api/song/delete/${record.id}`, {"headers":{"mode":"no-cors"}})}>
                        Eliminar
                    </Typography.Link>

                </Space>
            ),
        },
    ];

    const [editingData, setEditingData] = useState<Song | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const fieldsEdit = (field: Song) => {
        setEditingData(field)
        setOpen(true);
    }
    const showDrawer = () => {
        setEditingData(undefined)
        setOpen(true);
    };

    const { data, error } = useSWR<Song[]>(song, fetchSong, {
            suspense: false,
    });

        return(
            <>
                <SongAntDrawer open={open} setOpen={setOpen} fields={editingData}></SongAntDrawer>
                <Button type="primary" icon={<PlusOutlined />}  onClick={showDrawer} >
                    Agregar
                </Button>
                <Table columns={columns} dataSource={data} ></Table>
            </>

        );
    };