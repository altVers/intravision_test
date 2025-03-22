import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { TNewTask } from "@/types/TTask";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Props {
  addNewTask: (task: TNewTask) => void;
}

type FieldType = {
  name: string;
  description: string;
};

export const AddTaskForm: React.FC<Props> = ({ addNewTask }) => {
  const { taskStatus } = useSelector((state: RootState) => state.tasks);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const task = {
      name: values.name,
      description: values.description,
      comment: "",
      price: 0,
      taskTypeId: 0,
      statusId: 54195,
      priorityId: 51828,
      serviceId: 0,
      resolutionDatePlan: new Date().toISOString(),
      tags: [],
      initiatorId: 0,
      executorId: 0,
      executorGroupId: 0,
    };

    addNewTask(task);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <>
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
          <Button
            type="primary"
            htmlType="submit"
            loading={taskStatus === "loading"}
          >
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
