'use client'

import React, { useEffect, useState } from "react";
import { Button, Flex } from "antd";
import { TaskTable } from "@/components/TaskTable/TaskTable";
import { TTasks } from "@/types/TTask";
import { fetchTasks } from "@/api/fetchTasks";

export default function Page() {
  const [tasks, setTasks] = useState<TTasks>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Ошибка при получении задач:", error);
      }
    };

    fetchData();
  }, []);

  console.log(tasks);

  return (
    <Flex gap={15} vertical align="start" style={{height: '100%'}}>
      <Button type="primary" size="large" style={{flexShrink: 0}}>Создать заявку</Button>
      <TaskTable data={tasks} />
    </Flex>
  );
}
