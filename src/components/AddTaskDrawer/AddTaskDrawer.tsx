import { FC } from "react";

import { CloseOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { AddTaskForm } from "../AddTaskForm/AddTaskForm";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { toggleAddTaskDrawer } from "@/store/drawersSlice";

const drawerStyles = {
  header: {
    backgroundColor: "#1A4876",
    color: "#FFFFFF",
    padding: "20px 24px",
  },
  body: {
    backgroundColor: "#ECF3F7",
  },
};

const closeIconStyles = { color: "white", fontSize: "20px" };


export const AddTaskDrawer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawers.addTaskDrawerState
  );
  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => dispatch(toggleAddTaskDrawer(false))}
      mask={false}
      size="large"
      title="Новая заявка"
      styles={drawerStyles}
      closeIcon={<CloseOutlined style={closeIconStyles} />}
      destroyOnClose
    >
      <AddTaskForm />
    </Drawer>
  );
};
