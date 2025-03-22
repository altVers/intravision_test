"use client";

import React, { useEffect, useState } from "react";
import { Button, Drawer, Flex, message } from "antd";
import { TasksTable } from "@/components/TaskTable/TaskTable";
import { TNewTask } from "@/types/TTask";
import { AddTaskForm } from "@/components/AddTaskForm/AddTaskForm";
import { CloseOutlined } from "@ant-design/icons";
import { EditTaskForm } from "@/components/EditTaskForm/EditTaskForm";
import { fetchTask } from "@/api/fetchTask";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchStatusesAsync } from "@/store/statusesSlice";
import { fetchUsersAsync } from "@/store/usersSlice";
import { fetchTagsAsync } from "@/store/tagsSlice";
import { fetchPrioritiesAsync } from "@/store/prioritiesSlice";
import { addTaskAsync, setEditedTask } from "@/store/tasksSlice";

export default function Page() {
  const [addDrawerOpen, setAddDrawerOpen] = useState<boolean>(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const {editedTask} = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  

  const onRowClick = async (id: number) => {
    try {
      const task = await fetchTask(id);
      dispatch(setEditedTask(task))
      setAddDrawerOpen(false);
      setEditDrawerOpen(true);
    } catch (error) {
      console.error("Ошибка при получении задачи:", error);
    }
  };

  const addNewTask = async (task: TNewTask) => {
    await dispatch(addTaskAsync(task)).then((resultAction) => {
      if (addTaskAsync.fulfilled.match(resultAction)) {
        messageApi.open({
          type: "success",
          content: "Задача успешно добвлена!",
        });
        dispatch(setEditedTask(resultAction.payload))
        setAddDrawerOpen(false);
        setEditDrawerOpen(true);
      } else {
        messageApi.open({
          type: "error",
          content: `Не удалось добавить задачу.`,
        });
      }
    });
  };

  const onAddBtnClick = () => {
    setEditDrawerOpen(false);
    setAddDrawerOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchStatusesAsync()),
          dispatch(fetchUsersAsync()),
          dispatch(fetchTagsAsync()),
          dispatch(fetchPrioritiesAsync()),
        ]);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      {contextHolder}
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
          <AddTaskForm addNewTask={addNewTask} />
        </Drawer>
        <Drawer
          title={
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span>№{editedTask?.id}</span>
              <span>{editedTask?.name}</span>
            </div>
          }
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
          {editedTask && <EditTaskForm key={editedTask.id} />}
        </Drawer>
      </Flex>
    </>
  );
}
