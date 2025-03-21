"use client";

import React, { useEffect, useState } from "react";
import { Button, Drawer, Flex, Input } from "antd";
import { TasksTable } from "@/components/TaskTable/TaskTable";
import { TTask, TTasks } from "@/types/TTask";
import { fetchTasks } from "@/api/fetchTasks";
import { AddTaskForm } from "@/components/AddTaskForm/AddTaskForm";
import { CloseOutlined } from "@ant-design/icons";
import { EditTaskForm } from "@/components/EditTaskForm/EditTaskForm";
import { fetchTask } from "@/api/fetchTask";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchStatusesAsync } from "@/store/statusesSlice";
import { fetchUsersAsync } from "@/store/usersSlice";
import { fetchTagsAsync } from "@/store/tagsSlice";

export default function Page() {
  const [addDrawerOpen, setAddDrawerOpen] = useState<boolean>(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<TTask>();
  const dispatch = useDispatch<AppDispatch>();

  const onRowClick = async (record: number) => {
    try {
      const data = await fetchTask(record);
      setEditTask(data);
      setAddDrawerOpen(false);
      setEditDrawerOpen(true);
    } catch (error) {
      console.error("Ошибка при получении задачи:", error);
    }
  };

  const onAddBtnClick = () => {
    setAddDrawerOpen(true);
    setEditDrawerOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchStatusesAsync()),
          dispatch(fetchUsersAsync()),
          dispatch(fetchTagsAsync()),
        ]);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Flex gap={15} vertical align="start" style={{ height: "100%" }}>
      <Button
        type="primary"
        size="large"
        style={{ flexShrink: 0 }}
        onClick={onAddBtnClick}
      >
        Создать заявку
      </Button>
      <TasksTable onRowClick={onRowClick} />
      <Drawer
        open={addDrawerOpen}
        onClose={() => setAddDrawerOpen(false)}
        mask={false}
        size="large"
        title="Новая заявка"
        styles={{
          header: {
            backgroundColor: "#1A4876",
            color: "#FFFFFF",
            padding: "20px 24px",
          },
          body: {
            backgroundColor: "#ECF3F7",
          },
        }}
        closeIcon={
          <CloseOutlined style={{ color: "white", fontSize: "20px" }} />
        }
        destroyOnClose
      >
        <AddTaskForm />
      </Drawer>
      <Drawer
        title={`№${editTask?.id} ${editTask?.name}`}
        placement="right"
        onClose={() => setEditDrawerOpen(false)}
        open={editDrawerOpen}
        size="large"
        mask={false}
        styles={{
          header: {
            backgroundColor: "#1A4876",
            color: "#FFFFFF",
            padding: "20px 24px",
          },
          body: {
            backgroundColor: "#ECF3F7",
          },
        }}
        closeIcon={
          <CloseOutlined style={{ color: "white", fontSize: "20px" }} />
        }
        destroyOnClose
      >
        {editTask && <EditTaskForm editTask={editTask} />}
      </Drawer>
    </Flex>
  );
}
