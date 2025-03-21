import { TTask } from "@/types/TTask";
import { Button, Col, DatePicker, Form, Input, Row, Select, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { FC, useEffect, useState } from "react";
import { Comment } from "../Comment/Comment";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import dayjs from "dayjs";

interface Props {
  editTask: TTask;
}

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

export const EditTaskForm: FC<Props> = ({ editTask }) => {
  const { statuses } = useSelector((state: RootState) => state.statuses);
  const { users } = useSelector((state: RootState) => state.users);

  const defaultStatus = editTask.statusName;
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    defaultStatus
  );
  const [statusColor, setStatusColor] = useState<string | undefined>(
    statuses.find((status) => status.name === defaultStatus)?.rgb
  );

  const statusesOptions = statuses.map((status) => ({
    label: <span>{status.name}</span>,
    value: status.id,
  }));

  const usersOptions = users.map((user) => ({
    label: <span>{user.name}</span>,
    value: user.id,
  }));

  useEffect(() => {
    const currentStatus = statuses.find(
      (status) => status.name === selectedStatus
    );
    if (currentStatus) {
      setStatusColor(currentStatus.rgb);
    }
  }, [selectedStatus, statuses]);

  return (
    <Row style={{ height: "100%" }}>
      <Col span={16} style={{ paddingRight: 16 }}>
        <Form name="editTaskForm" layout="vertical">
          <div style={{ ...contentBlockStyles, marginBottom: 30 }}>
            <span style={labelStyles}>Описание</span>
            <span>{editTask.description}</span>
          </div>
          <Form.Item
            label={<span style={labelStyles}>Добавление комментариев</span>}
            layout="vertical"
          >
            <TextArea />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
        <ul>
          {editTask.lifetimeItems?.map((item) => (
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
          defaultValue={editTask.statusName}
          options={statusesOptions}
          value={selectedStatus}
          onChange={(value) =>
            setSelectedStatus(
              statuses.find((status) => status.id === +value)?.name
            )
          }
        />
        <div style={contentBlockStyles}>
          <span style={labelStyles}>Заявитель</span>
          <span>{editTask.initiatorName}</span>
        </div>
        <div style={contentBlockStyles}>
          <span style={labelStyles}>Создана</span>
          <span>{editTask.initiatorName}</span>
        </div>
        <div style={contentBlockStyles}>
          <span style={labelStyles}>Исполнитель</span>
          <Select options={usersOptions} defaultValue={editTask.executorName} />
        </div>
        <div style={contentBlockStyles}>
          <span style={labelStyles}>Срок</span>
          <DatePicker
            defaultValue={dayjs(editTask.resolutionDatePlan)}
            format="DD.MM.YYYY"
          />
        </div>
        <div style={contentBlockStyles}>
          <span style={labelStyles}>Теги</span>
          <span>{editTask.tags.map((tag) => <Tag key={tag.id}>{tag.name}</Tag>)}</span>
        </div>
      </Col>
    </Row>
  );
};
