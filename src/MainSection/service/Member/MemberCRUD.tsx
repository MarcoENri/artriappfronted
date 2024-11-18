
import {ColumnsType} from "antd/es/table";
import useSWR from "swr";
import {fetchMember, member} from "./MemberService/MemberService";
import { Space, Table, Button, Typography  } from 'antd';
import React, {useState} from "react";
import { PlusOutlined } from '@ant-design/icons';
import Member from "./Interface/InterfaceMember";
import { MemberAntDrawer } from "../../components/AntDrawer/MemberAntDrawer";
import axios from "axios";

import { Apiurl } from "../../../HomeSection/pages/constantes/apiurl"


export const MemberCRUD: React.FC  = () => {
    const columns: ColumnsType<Member> = [
        {
            title: 'id',
            dataIndex:'id',
            key: 'id',
        },
        {
            title: 'Nickname',
            dataIndex: 'nickname',
            key: 'nickname'
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Apellido',
            dataIndex: 'lastname',
            key: 'lastname',
        },
    
        {
            title: 'Edad',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Contraseña',
            dataIndex: 'password',
            key: 'password'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Rol',
            dataIndex: 'role',
            key: 'role'
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Typography.Link onClick={()=>fieldsEdit(record)} style={{ marginRight: 8 }}>
                        Editar
                    </Typography.Link>
                    <Typography.Link  style={{ marginRight: 8 }} 
                    onClick={()=>axios.delete(`${Apiurl}/api/v1/member/delete/${record.id}`, {"headers":{"mode":"no-cors"}})}>
                        Eliminar
                    </Typography.Link>

                </Space>
            ),
        },
    ];

    const [editingData, setEditingData] = useState<Member | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const fieldsEdit = (field: Member) => {
        setEditingData(field)
        setOpen(true);
    }
    const showDrawer = () => {
        setEditingData(undefined)
        setOpen(true);
    };

    const { data, error } = useSWR<Member[]>(member, fetchMember, {
            suspense: false,
    });


        return(
            <>
                <MemberAntDrawer open={open} setOpen={setOpen} fields={editingData}></MemberAntDrawer>
                <Button type="primary" icon={<PlusOutlined />}  onClick={showDrawer} >
                    Agregar
                </Button>
                <Table columns={columns} dataSource={data} ></Table>
            </>

        );
    };