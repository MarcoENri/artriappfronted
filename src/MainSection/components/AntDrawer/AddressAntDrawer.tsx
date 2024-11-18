import React, { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import {Button, Col, Drawer, Form, FormInstance, Input, Row} from 'antd';
import Address from '../../service/Address/Interface/InterfaceAddress';
import { address, createAddress, updateAddress } from '../../service/Address/AddressService/AddressService';

type DrawerType = {
    open: boolean;
    setOpen: any;
    fields?: Address;
};

export const AddressAntDrawer: React.FC<DrawerType> = ({open, setOpen, fields}: DrawerType) => {
    const [form] = Form.useForm();
    const onClose = () => {
        form.resetFields();
        setOpen(false);
    };

    const onFinish = async (values: Address) => {
        values.id = Number(values.id);
        values.city = String(values.city);
        values.country = String(values.country);
        values.memberId = Number(values.memberId)
        //await trigger(values);
        onClose();
    };

    useEffect(() => {
        form.setFieldsValue(fields);
    }, [fields, form]);

    const { trigger, isMutating } = useSWRMutation(
        fields ? `${address}` : address,
        fields ? updateAddress : createAddress
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
        <Col span={12}>
                <Form.Item
                    name="id"
                    label="Id"
                    rules={[{ required: true, message: 'Por favor ingrese el id' }]}
                >
                    <Input placeholder="Please enter el id" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="city"
                    label="Ciudad"
                    rules={[{ required: true, message: 'Por favor ingrese la ciudad' }]}
                >
                    <Input placeholder="Please enter a city" />
                </Form.Item>
            </Col>
            <Col span ={12} >
                <Form.Item
                    name="country"
                    label="País"
                    rules={[{ required: true, message: 'Por favor ingrese el país' }]}
                >
                    <Input placeholder="Please enter country" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="memberId"
                    label="Id del miembro"
                    rules={[{ required: true, message: 'Please enter a memberId' }]}
                >
                    <Input placeholder="Please enter a memberId" />
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