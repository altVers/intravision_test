import {
  Button,
  Col,
  DatePicker,
  Form,
  FormProps,
  Row,
  Select,
  SelectProps,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { Comment } from "../Comment/Comment";

import dayjs from "dayjs";

import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { editTaskAsync, setEditedTask } from "@/store/tasksSlice";

type FieldType = {
  comment: string;
};

const statusCircleStyles: React.CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: "50%",
  margin: "0 2px",
};

const rightColStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 30,
  borderLeft: "1px solid #D7DCE0",
  paddingLeft: 16,
};

const contentBlockStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const labelStyles: React.CSSProperties = {
  color: "#9F9FA7",
};

const editTaskBtnStyles:React.CSSProperties = {
  width: 150,
  height: 35,
  backgroundColor: "#008CF0",
  borderRadius: 30,
}

export const EditTaskForm: FC = () => {
  const { editedTask, taskStatus } = useSelector(
    (state: RootState) => state.tasks
  );
  const { statuses } = useSelector((state: RootState) => state.statuses);
  const { priorities } = useSelector((state: RootState) => state.priorities);
  const { users } = useSelector((state: RootState) => state.users);
  const { tags } = useSelector((state: RootState) => state.tags);
  const dispatch = useDispatch<AppDispatch>();

  // Стейты для выбранного статуса и его цвета
  const defaultStatus = editedTask.statusId;
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    defaultStatus
  );
  const [statusColor, setStatusColor] = useState<string | undefined>(
    statuses.find((status) => status.id === defaultStatus)?.rgb
  );

  const [form] = useForm();

  useEffect(() => {
    // При изменении статуса меняем также цвет кружка
    const currentStatus = statuses.find(
      (status) => status.id === selectedStatus
    );
    if (currentStatus) {
      setStatusColor(currentStatus.rgb);
    }
  }, [selectedStatus, statuses, defaultStatus]);

  // Мапим данные под селект
  const statusesOptions: SelectProps["options"] = statuses.map((status) => ({
    label: status.name,
    value: status.id,
  }));

  const executorsOptions: SelectProps["options"] = users.map((user) => ({
    label: user.name,
    value: user.id,
  }));

  const tagsOptions: SelectProps["options"] = tags.map((tag) => ({
    label: tag.name,
    value: tag.id,
  }));

  const prioritysOptions: SelectProps["options"] = priorities.map((tag) => ({
    label: tag.name,
    value: tag.id,
  }));

  // Темплейт для запроса на едит с обязательными полями
  const editedValuesTemplate = {
    id: editedTask.id,
    statusId: editedTask.statusId,
    executorId: editedTask.executorId,
  };

  const onAddComment: FormProps<FieldType>["onFinish"] = async (values) => {
    // Собираем объект на отправку
    const editedValues = {
      ...editedValuesTemplate,
      ...values,
    };
    // 1. Отправляем запрос и димпатчим данные в стор.
    // 2. Если успешно, открываем сообщение об успехе и заменяем объект
    // изменяемой задачи в сторе, иначе - сообщение об ошибке.
    // 3. Очищаем форму, если комментарий успешно отправился.
    await dispatch(editTaskAsync(editedValues)).then((resultAction) => {
      if (editTaskAsync.fulfilled.match(resultAction)) {
        dispatch(setEditedTask(resultAction.payload));
        form.resetFields();
      }
    });
  };

  const onStatusChange = async (value: number) => {
    setSelectedStatus(statuses.find((status) => status.id === value)?.id);
    const editedValues = {
      ...editedValuesTemplate,
      statusId: value,
    };
    await dispatch(editTaskAsync(editedValues));
  };

  const onExecutorChange = async (value: number) => {
    const editedValues = {
      ...editedValuesTemplate,
      executorId: value,
    };
    await dispatch(editTaskAsync(editedValues));
  };

  const onTagChange = async (value: number[]) => {
    const editedValues = {
      ...editedValuesTemplate,
      tags: [...value],
    };
    await dispatch(editTaskAsync(editedValues));
  };

  const onPriorityChange = async (value: number) => {
    const editedValues = {
      ...editedValuesTemplate,
      priorityId: value,
    };
    await dispatch(editTaskAsync(editedValues));
  };

  return (
    <>
      <Row style={{ height: "100%" }}>
        <Col span={16} style={{ paddingRight: 16 }}>
          <Form
            name="editTaskForm"
            layout="vertical"
            onFinish={onAddComment}
            form={form}
            style={{marginBottom: 50}}
          >
            <div style={{ ...contentBlockStyles, marginBottom: 65 }}>
              <span style={labelStyles}>Описание</span>
              <div dangerouslySetInnerHTML={{__html: editedTask.description}} />
            </div>
            <Form.Item<FieldType>
              name="comment"
              label={<span style={labelStyles}>Добавление комментариев</span>}
              layout="vertical"
            >
              <TextArea autoSize={{minRows: 4}}/>
            </Form.Item>
            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                style={editTaskBtnStyles}
              >
                Сохранить
              </Button>
            </Form.Item>
          </Form>
          <ul>
            {editedTask.lifetimeItems?.map((item) => (
              <li key={item.id}>
                <Comment data={item} />
              </li>
            ))}
          </ul>
        </Col>
        <Col span={8} style={rightColStyles}>
          <Select
            prefix={
              <div
                style={{ ...statusCircleStyles, backgroundColor: statusColor }}
              />
            }
            defaultValue={editedTask.id}
            options={statusesOptions}
            value={selectedStatus}
            onChange={onStatusChange}
          />
          <div style={contentBlockStyles}>
            <span style={labelStyles}>Заявитель</span>
            <span>{editedTask.initiatorName}</span>
          </div>
          <div style={contentBlockStyles}>
            <span style={labelStyles}>Создана</span>
            <span>{editedTask.initiatorName}</span>
          </div>
          <div style={contentBlockStyles}>
            <span style={labelStyles}>Исполнитель</span>
            <Select
              options={executorsOptions}
              defaultValue={editedTask.executorId}
              onChange={onExecutorChange}
            />
          </div>
          <div style={contentBlockStyles}>
            <span style={labelStyles}>Приоритет</span>
            <Select
              options={prioritysOptions}
              defaultValue={editedTask.priorityId}
              onChange={onPriorityChange}
            />
          </div>
          <div style={contentBlockStyles}>
            <span style={labelStyles}>Срок</span>
            <DatePicker
              defaultValue={dayjs(editedTask.resolutionDatePlan)}
              format="DD.MM.YYYY"
            />
          </div>
          <div style={contentBlockStyles}>
            <span style={labelStyles}>Теги</span>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Добавить тег"
              defaultValue={[...editedTask.tags.map((t) => t.id)]}
              onChange={onTagChange}
              options={tagsOptions}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
