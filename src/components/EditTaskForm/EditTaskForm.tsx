import { AppDispatch, RootState } from "@/store/store";
import { editTaskAsync, setEditedTask } from "@/store/tasksSlice";
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormProps,
  message,
  Row,
  Select,
  SelectProps,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comment } from "../Comment/Comment";

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

export const EditTaskForm: FC = () => {
  const { editedTask, taskStatus } = useSelector(
    (state: RootState) => state.tasks
  );
  const { statuses } = useSelector((state: RootState) => state.statuses);
  const { users } = useSelector((state: RootState) => state.users);
  const { tags } = useSelector((state: RootState) => state.tags);

  const defaultStatus = editedTask.statusId;
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    defaultStatus
  );
  const [statusColor, setStatusColor] = useState<string | undefined>(
    statuses.find((status) => status.id === defaultStatus)?.rgb
  );

  const dispatch = useDispatch<AppDispatch>();

  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const editedValuesTemplate = {
    id: editedTask.id,
    statusId: editedTask.statusId,
    executorId: editedTask.executorId,
  };

  const onAddComment: FormProps<FieldType>["onFinish"] = async (values) => {
    const editedValues = {
      ...editedValuesTemplate,
      ...values,
    };
    await dispatch(editTaskAsync(editedValues))
      .then((resultAction) => {
        if (editTaskAsync.fulfilled.match(resultAction)) {
          dispatch(setEditedTask(resultAction.payload));
        }
      })
      .then(
        messageApi.open({
          type: "success",
          content: "Комментарий добавлен!",
        })
      )
      .catch((error) => {
        console.error("Не удалось внести изменения.", error.message);
        messageApi.open({
          type: "error",
          content: `Не удалось внести изменения.`,
        });
      });
    form.resetFields();
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

  useEffect(() => {
    const currentStatus = statuses.find(
      (status) => status.id === selectedStatus
    );
    if (currentStatus) {
      setStatusColor(currentStatus.rgb);
    }
  }, [selectedStatus, statuses, defaultStatus]);

  return (
    <>
      {contextHolder}
      <Row style={{ height: "100%" }}>
        <Col span={16} style={{ paddingRight: 16 }}>
          <Form
            name="editTaskForm"
            layout="vertical"
            onFinish={onAddComment}
            form={form}
          >
            <div style={{ ...contentBlockStyles, marginBottom: 30 }}>
              <span style={labelStyles}>Описание</span>
              <span>{editedTask.description}</span>
            </div>
            <Form.Item<FieldType>
              name="comment"
              label={<span style={labelStyles}>Добавление комментариев</span>}
              layout="vertical"
            >
              <TextArea />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                loading={taskStatus === "loading"}
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
