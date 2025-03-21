"use client";

import React, { FC, useEffect } from "react";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { TTasks } from "@/types/TTask";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchTasksAsync } from "@/store/tasksSlice";

export interface TasksTableDataType {
  key: number;
  id: number;
  name: string;
  status: string;
  executor: string;
}

interface Props {
  onRowClick: (record: number) => void;
}

const columns: TableProps<TasksTableDataType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
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
    render: (tag) => {
      let color = "";
      switch (tag) {
        case "Открыта":
          color = "grey";
          break;
        case "Выполнена":
          color = "green";
          break;
        case "В работе":
          color = "gold";
          break;
        case "Отложена":
          color = "blue";
          break;
        default:
          color = "grey";
      }
      return <Tag color={color}>{tag}</Tag>;
    },
  },
  {
    title: "Исполнитель",
    dataIndex: "executor",
    key: "executor",
  },
];

export const TasksTable: FC<Props> = ({ onRowClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {tasks, status} = useSelector((state: RootState) => state.tasks)

  useEffect(() => {
    dispatch(fetchTasksAsync())
  }, [dispatch]);

  const parsedData = tasks.map((item) => {
    return {
      key: item.id,
      id: item.id,
      name: item.name,
      status: item.statusName,
      executor: item.executorName,
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
        loading={status === 'loading'}
      />
    </>
  );
};
