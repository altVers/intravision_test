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
      <Flex gap={15} vertical align="start" style={{ height: "100%" }}>
        <Button
          type="primary"
          size="large"
          style={{ flexShrink: 0 }}
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
