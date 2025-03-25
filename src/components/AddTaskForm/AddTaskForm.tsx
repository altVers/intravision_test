import { FC } from "react";

import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { toggleEditTaskDrawer } from "@/store/drawersSlice";
import { addTaskAsync, setEditedTask } from "@/store/tasksSlice";

type FieldType = {
  name: string;
  description: string;
};

const addTaskBtnStyles:React.CSSProperties = {
  width: 150,
  height: 35,
  backgroundColor: "#008CF0",
  borderRadius: 30,
}

export const AddTaskForm: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { taskStatus } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    // Собираем объект для отправки по схеме из сваггера
    // statusId, priorityId выбрал случайные из доступных
    const task = {
      name: values.name,
      description: values.description,
      comment: "",
      price: 0,
      taskTypeId: 0,
      statusId: 54195,
      priorityId: 59432,
      serviceId: 0,
      resolutionDatePlan: new Date().toISOString(),
      tags: [],
      initiatorId: 0,
      executorId: 0,
      executorGroupId: 0,
    };

    // Отправляем запрос на добавление задачи, если запрос удачный:
    // 1. Показываем соотвествующее сообщение
    // 2. Определяем задачу, как редактируемую, отправляем в стор
    // 3. Открываем дровер редактирования
    // Если неудачно:
    // 1. Показываем сообщение
    // 2. В консоли появится сообщение об ошибке (логика в кейсе в сторе)
    await dispatch(addTaskAsync(task)).then((resultAction) => {
      if (addTaskAsync.fulfilled.match(resultAction)) {
        messageApi.open({
          type: "success",
          content: "Задача успешно добвлена!",
        });
        dispatch(setEditedTask(resultAction.payload));
        dispatch(toggleEditTaskDrawer(true));
      } else {
        messageApi.open({
          type: "error",
          content: `Не удалось добавить задачу.`,
        });
      }
    });
  };

  // Тут еще одна ошибка будет выскакивать, если отправть форму не вышло
  // Возможно, уже измбыточно, но оставил
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
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
        >
          <TextArea autoSize={{minRows: 3}}/>
        </Form.Item>

        <Form.Item<FieldType>
          label="Описание"
          name="description"
        >
          <TextArea autoSize={{minRows: 6}}/>
        </Form.Item>

        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
            loading={taskStatus === "loading"}
            style={addTaskBtnStyles}
          >
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
