"use client";

import { useEffect } from "react"
// Импорты компонентов
import { Button, Flex, message } from "antd";
import { TasksTable } from "@/components/TaskTable/TaskTable";
import { EditTaskDrawer } from "@/components/EditTaskDrawer/EditTaskDrawer";
import { AddTaskDrawer } from "@/components/AddTaskDrawer/AddTaskDrawer";
// Импорты стора
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchPrioritiesAsync } from "@/store/prioritiesSlice";
import { fetchStatusesAsync } from "@/store/statusesSlice";
import { fetchTagsAsync } from "@/store/tagsSlice";
import { fetchUsersAsync } from "@/store/usersSlice";
import { toggleAddTaskDrawer } from "@/store/drawersSlice";

const addBtnStyles: React.CSSProperties = {
  width: 180,
  height: 40,
  backgroundColor: "#008CF0",
  borderRadius: 30,
  marginLeft: 250,
}

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();

  // Получение и диспатч всех данных в стор:
  // Статусы, юзеры, теги, приоритеты
  useEffect(() => {
    const fetchData = async () => {
      // Не добавил trycatch так как у каждого 
      // диспатча есть отлов ошибки в кейсах
      await Promise.all([
        dispatch(fetchStatusesAsync()),
        dispatch(fetchUsersAsync()),
        dispatch(fetchTagsAsync()),
        dispatch(fetchPrioritiesAsync()),
      ]);
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <Flex gap={24} vertical align="start" style={{ height: "100%" }}>
        <Button
          type="primary"
          size="large"
          style={addBtnStyles}
          onClick={() => dispatch(toggleAddTaskDrawer(true))}
        >
          Создать заявку
        </Button>
        <TasksTable />
        <AddTaskDrawer />
        <EditTaskDrawer />
      </Flex>
    </>
  );
}
