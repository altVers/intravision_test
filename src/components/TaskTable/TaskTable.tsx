"use client";

import React, { FC } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { TTasks } from "@/types/TTask";

interface DataType {
  key: number;
  id: number;
  name: string;
  status: string;
  executor: string;
}

interface Props {
  data: TTasks;
}

const columns: TableProps<DataType>["columns"] = [
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
  },
  {
    title: "Исполнитель",
    dataIndex: "executor",
    key: "executor",
  },
];

const data: DataType[] = [];

export const TaskTable: FC<Props> = ({ data }) => {
    const parsedData = data.map(item => {
        return {
            key: item.id,
            id: item.id,
            name: item.name,
            status: item.statusName,
            executor: item.executorName,
        };
    })
  return <Table<DataType> columns={columns} dataSource={parsedData} scroll={{y: 700}} pagination={false}/>;
};
