"use client";

import React, { FC, useEffect } from "react";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchTasksAsync } from "@/store/tasksSlice";

export interface TasksTableDataType {
  key: number;
  id: number;
  name: string;
  status: string;
  executor: string;
  priorityId: number;
  statusId: number;
}

const statusBarStyles: React.CSSProperties = {
  width: 4,
  height: 24,
  marginRight: 15,
  borderRadius: 8,
};

interface Props {
  onRowClick: (record: number) => void;
}

export const TasksTable: FC<Props> = ({ onRowClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, taskStatus } = useSelector((state: RootState) => state.tasks);
  const { priorities } = useSelector((state: RootState) => state.priorities);
  const { statuses } = useSelector((state: RootState) => state.statuses);

  const columns: TableProps<TasksTableDataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", height: '100%' }}>
          <div
            style={{
              ...statusBarStyles,
              backgroundColor:
                priorities.find((p) => p.id === record.priorityId)?.rgb ||
                "transparent",
            }}
          />
          {text}
        </div>
      ),
    },
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (tag, record) => {
        let color = statuses.find((s) => s.id === record.statusId)?.rgb || "gray";
        return <Tag color={color}>{tag}</Tag>;
      },
    },
    {
      title: "Исполнитель",
      dataIndex: "executor",
      key: "executor",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(fetchTasksAsync());
      } catch (error) {
        console.error("Ошибка при загрузке данных таблицы: ", error);
      }
    }
    fetchData();
  }, [dispatch]);

  const parsedData = tasks.map((item) => {
    return {
      key: item.id,
      id: item.id,
      name: item.name,
      status: item.statusName,
      executor: item.executorName,
      priorityId: item.priorityId,
      statusId: item.statusId,
    };
  });

  return (
    <>
      <Table<TasksTableDataType>
        columns={columns}
        dataSource={parsedData}
        scroll={{ y: 700 }}
        pagination={false}
        onRow={(record) => ({
          onClick: () => onRowClick(record.id),
        })}
        loading={taskStatus === "loading"}
      />
    </>
  );
};
