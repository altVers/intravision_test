"use client";

import React, { useEffect, useState } from "react";
import { Button, Drawer, Flex } from "antd";
import { TaskTable } from "@/components/TaskTable/TaskTable";
import { TTasks } from "@/types/TTask";
import { fetchTasks } from "@/api/fetchTasks";
import { AddTaskForm } from "@/components/AddTaskForm/AddTaskForm";
import { CloseOutlined } from "@ant-design/icons";

export default function Page() {
  const [addTaskDrawerIsOpen, setAddTaskDrawerIsOpen] =
    useState<boolean>(false);
  const [tasks, setTasks] = useState<TTasks>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await fetchTasks();
        console.log(tasks);
        setTasks(tasks);
      } catch (error) {
        console.error("Ошибка при получении задач:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Flex gap={15} vertical align="start" style={{ height: "100%" }}>
      <Button
        type="primary"
        size="large"
        style={{ flexShrink: 0 }}
        onClick={() => setAddTaskDrawerIsOpen(true)}
      >
        Создать заявку
      </Button>
      <TaskTable data={tasks} />
      <Drawer
        open={addTaskDrawerIsOpen}
        onClose={() => setAddTaskDrawerIsOpen(false)}
        mask={false}
        size="large"
        title="Новая заявка"
        styles={{ header: { backgroundColor: "#1A4876", color: "#FFFFFF", padding: "20px 24px" } }}
        closeIcon={  
          <CloseOutlined style={{ color: 'white', fontSize: '20px' }} /> 
        } 
        destroyOnClose
      >
        <AddTaskForm />
      </Drawer>
    </Flex>
  );
}
