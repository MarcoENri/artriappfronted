import {ColumnsType} from "antd/es/table";
import useSWR from "swr";
import { Space, Table, Button, Typography  } from 'antd';
import React, {useState} from "react";
import { PlusOutlined } from '@ant-design/icons';
import Address from "./Interface/InterfaceAddress";
import { address, fetchAddress } from "./AddressService/AddressService";
import { AddressAntDrawer } from "../../components/AntDrawer/AddressAntDrawer";
import axios from "axios";

import { Apiurl } from "../../../HomeSection/pages/constantes/apiurl"


export const AddressCRUD: React.FC  = () => {
    const columns: ColumnsType<Address> = [
        {
            title: 'id',
            dataIndex:'id',
            key: 'id',
        },
        {
            title: 'Ciudad',
            dataIndex: 'city',
            key: 'city'
        },
        {
            title: 'País',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Id de miembro',
            dataIndex: 'memberId',
            key: 'memberId',
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
                    onClick={()=>axios.delete(`${Apiurl}/api/address/delete/${record.id}`, {"headers":{"mode":"no-cors"}})}>
                        Eliminar
                    </Typography.Link>

                </Space>
            ),
        },
    ];

    const [editingData, setEditingData] = useState<Address | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const fieldsEdit = (field: Address) => {
        setEditingData(field)
        setOpen(true);
    }
    const showDrawer = () => {
        setEditingData(undefined)
        setOpen(true);
    };

    const { data, error } = useSWR<Address[]>(address,fetchAddress , {
            suspense: false,
    });


        return(
            <>
                <AddressAntDrawer open={open} setOpen={setOpen} fields={editingData}></AddressAntDrawer>
                <Button type="primary" icon={<PlusOutlined />}  onClick={showDrawer} >
                    Agregar
                </Button>
                <Table columns={columns} dataSource={data} ></Table>
            </>

        );
    };