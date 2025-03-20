"use client";

import React, { FC, useState } from "react";
import { Button, Drawer, Input, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { TTasks } from "@/types/TTask";
import { CloseOutlined } from "@ant-design/icons";

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

const data: DataType[] = [];

export const TaskTable: FC<Props> = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<DataType | null>(null);
  const onRowClick = (record: DataType) => {
    setSelectedRowData(record);
    setVisible(true);
  };
  const parsedData = data.map((item) => {
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
      <Table<DataType>
      columns={columns}
      dataSource={parsedData}
      scroll={{ y: 700 }}
      pagination={false}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
    />
    <Drawer  
        title={`№${selectedRowData?.id} ${selectedRowData?.name}`} 
        placement="right"  
        onClose={() => setVisible(false)}  
        open={visible}
        size="large"
        mask={false}
        styles={{ header: { backgroundColor: "#1A4876", color: "#FFFFFF", padding: "20px 24px" } }}
        closeIcon={  
          <CloseOutlined style={{ color: 'white', fontSize: '20px' }} /> 
        } 
        destroyOnClose
      >  
        {selectedRowData && (  
          <>  
            <Input   
              placeholder="Имя"   
              value={selectedRowData.name}   
              style={{ marginBottom: 16 }}   
            />  
            <Input   
              placeholder="Возраст"   
              value={selectedRowData.status}   
              style={{ marginBottom: 16 }}   
            />  
            <Input   
              placeholder="Адрес"   
              value={selectedRowData.executor}   
              style={{ marginBottom: 16 }}   
            />  
          </>  
        )}  
        <Button type="primary">  
          Сохранить  
        </Button>  
      </Drawer>
    </>
  );
};
