"use client";

import React, { FC, useEffect } from "react";

import { Table, Tag } from "antd";
import type { TableProps } from "antd";

import { fetchTask } from "@/api/fetchTask";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchTasksAsync, setEditedTask } from "@/store/tasksSlice";
import { toggleEditTaskDrawer } from "@/store/drawersSlice";

export interface TasksTableDataType {
  key: number;
  id: number;
  name: string;
  status: string;
  executor: string;
  priorityId: number;
  statusId: number;
}

const priorityBarStyles: React.CSSProperties = {
  width: 6,
  height: "100%",
  marginRight: 10,
  borderRadius: 8,
  marginLeft: -16,
};

const statusBarStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "100%",
  padding: "6px 15px",
  borderRadius: 12,
};

const statusTextStyles: React.CSSProperties = {
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "#FFFFFF",
  lineHeight: "14px",
};

const taskTitleStyles: React.CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxHeight: "3em",
  lineHeight: "1.5em",
};

const textContainer: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  height: 54,
};

export const TasksTable: FC = () => {
  const { tasks, taskStatus } = useSelector((state: RootState) => state.tasks);
  const { priorities } = useSelector((state: RootState) => state.priorities);
  const { statuses } = useSelector((state: RootState) => state.statuses);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchTasksAsync());
    }
    fetchData();
  }, [dispatch]);

  const columns: TableProps<TasksTableDataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 115,
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", height: 54 }}>
          <div
            style={{
              ...priorityBarStyles,
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
      width: 400,
      render: (record) => (
        <div style={textContainer}>
          <div style={taskTitleStyles}>{record}</div>
        </div>
      ),
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (tag, record) => {
        let color =
          statuses.find((s) => s.id === record.statusId)?.rgb || "gray";
        return (
          <span style={{ ...statusBarStyles, backgroundColor: color }}>
            <span style={statusTextStyles}>{tag}</span>
          </span>
        );
      },
    },
    {
      title: "Исполнитель",
      dataIndex: "executor",
      key: "executor",
    },
  ];

  const onRowClick = async (id: number) => {
    try {
      const task = await fetchTask(id);
      dispatch(setEditedTask(task));
      dispatch(toggleEditTaskDrawer(true));
    } catch (error) {
      console.error("Ошибка при получении задачи:", error);
    }
  };

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
        scroll={{ y: 1000 }}
        pagination={false}
        onRow={(record) => ({
          onClick: () => onRowClick(record.id),
        })}
        loading={taskStatus === "loading"}
      />
    </>
  );
};
