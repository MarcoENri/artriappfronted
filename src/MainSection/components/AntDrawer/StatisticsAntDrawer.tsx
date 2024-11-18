import React, { useEffect } from "react";
import useSWRMutation from "swr/mutation";

//import useSWR, { mutate } from 'swr';

import { Button, Col, Drawer, Form, FormInstance, Input, Row } from "antd";

/*import Statistics from "../../service/Address copy/Interface/InterfaceStatistics";*/

import Statistics from "../../service/StatisticsView/Interface/StatisticsViewInterface";

import {createStatistics,statistics,updateStatistics} from "../../service/StatisticsView/StatisticsService";

 //from "../../service/Address/Interface/InterfaceAddress";

type DrawerType = {
  open: boolean;
  setOpen: any;
  fields?: Statistics;  
};

export const StatisticsAntDrawer: React.FC<DrawerType> = ({
  open,
  setOpen,
  fields,
}: DrawerType) => {
  const [form] = Form.useForm();
  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };
  const onFinish = async (values: Statistics) => {
    values.id = Number(values.id);
    values.date = String(values.date);
    values.score = Number(values.score);
    values.songId = Number(values.songId);
    values.memberId = Number(values.memberId);    
    values.member = String(values.member);
    values.song = String(values.song);
   // await trigger(values);
    onClose();
  };

  useEffect(() => {
    form.setFieldsValue(fields);
  }, [fields, form]);

  const { trigger, isMutating } = useSWRMutation(
    fields ? `${statistics}` : statistics,
    fields ? updateStatistics : createStatistics
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
  form: FormInstance;
  loading: boolean;
  onFinish: any;
};
const FormSection: React.FC<FormType> = ({ form, loading, onFinish }) => (
  <Form layout="vertical" hideRequiredMark onFinish={onFinish} form={form}>
    <Row gutter={16}>
    <Col span={12}>
        <Form.Item
          name="id"
          label="id"
          rules={[{ required: true, message: "Por favor ingrese el id" }]}
        >
          <Input placeholder="Please enter id" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="date"
          label="Fecha"
          rules={[{ required: true, message: "Por favor ingrese la ciudad" }]}
        >
          <Input placeholder="Please enter a city" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="score"
          label="Puntaje"
          rules={[{ required: true, message: "Por favor ingrese el país" }]}
        >
          <Input placeholder="Please enter country" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="memberId"
          label="Id del miembro"
          rules={[{ required: true, message: "Please enter a memberId" }]}
        >
          <Input placeholder="Please enter a memberId" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="songId"
          label="Id de la canción"
          rules={[{ required: true, message: "Please enter a songId" }]}
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
);
