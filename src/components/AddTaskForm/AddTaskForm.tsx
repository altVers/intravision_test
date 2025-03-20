import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

type FieldType = {
  name?: string;
  description?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export const AddTaskForm: React.FC = () => (
  <Form
    name="addTaskForm"
    labelCol={{ span: 100 }}
    wrapperCol={{ span: 20 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    layout="vertical"
  >
    <Form.Item<FieldType>
      label="Название"
      name="name"
      rules={[{ required: true, message: "Введите название задачи" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Описание"
      name="description"
      rules={[{ required: true, message: "Введите описание задачи" }]}
    >
      <TextArea />
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Добавить
      </Button>
    </Form.Item>
  </Form>
);
