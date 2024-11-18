import React, { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';

import {Button, Col, Drawer, Form, FormInstance, Input, Row} from 'antd';
import Song from '../../service/Song/Interface/SongInterface';
import { createSong, song, updateSong } from '../../service/Song/SongService/SongService';


type DrawerType = {
    open: boolean;
    setOpen: any;
    fields?: Song;
};

export const SongAntDrawer: React.FC<DrawerType> = ({open, setOpen, fields}: DrawerType) => {
    const [form] = Form.useForm();
    const onClose = () => {
        form.resetFields();
        setOpen(false);
    };
    const onFinish = async (values: Song) => {
        values.id = Number(values.id)
        values.name = String(values.name);
        values.genre = String(values.genre);
        values.memberId = Number(values.memberId);
        //await trigger(values);
        onClose();
    };

    useEffect(() => {
        form.setFieldsValue(fields);
    }, [fields, form]);

    const { trigger, isMutating } = useSWRMutation(
        fields ? `${song}` : song,
        fields ? updateSong : createSong
    );

    return (
        <Drawer
            title="Nuevo"
            width={720}
            onClose={onClose}
            open={open}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <FormSection form={form} loading={isMutating} onFinish={onFinish} />
        </Drawer>
    );
};



type FormType = {
 form:FormInstance;
 loading: boolean;
 onFinish: any
}
const FormSection: React.FC<FormType> = ({ form, loading, onFinish }) => (
    <Form
        layout="vertical"
        hideRequiredMark
        onFinish={onFinish}
        form={form}
    >
        <Row gutter={16}>
            <Col span ={12} >
                <Form.Item
                    name="id"
                    label="Id"
                    rules={[{ required: true, message: 'Por favor ingrese un id' }]}
                >
                    <Input placeholder="Please enter id" />
                </Form.Item>
            </Col>
            <Col span ={12} >
                <Form.Item
                    name="name"
                    label="Nombre"
                    rules={[{ required: true, message: 'Por favor ingrese un nombre' }]}
                >
                    <Input placeholder="Please enter user name" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="genre"
                    label="Género"
                    rules={[{ required: true, message: 'Por favor ingrese un género' }]}
                >
                    <Input placeholder="Please enter a episode" />
                </Form.Item>
            </Col>
         
            <Col span={12}>
                <Form.Item
                    name="memberId"
                    label="ID de miembro"
                    rules={[{ required: true, message: 'Por favor ingrese el ID del miembro' }]}
                >
                    <Input placeholder="Please enter a episode" />
                </Form.Item>
            </Col>
            
        </Row>
        <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
                Save
            </Button>
        </Form.Item>
    </Form>
)