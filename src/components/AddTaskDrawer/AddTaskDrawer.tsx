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
    padding: "24px 36px",
  },
  body: {
    backgroundColor: "#ECF3F7",
    padding: 36,
  },
};
const drawerTitleStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const closeIconStyles: React.CSSProperties = {
  color: "white",
  fontSize: "20px",
};
const closeBtnStyles: React.CSSProperties = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
};

export const AddTaskDrawer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawers.addTaskDrawerState
  );
  return (
    <Drawer
      open={isDrawerOpen}
      mask={false}
      width={976}
      title={
        <div style={drawerTitleStyles}>
          <span>Новая заявка</span>
          <button
            onClick={() => dispatch(toggleAddTaskDrawer(false))}
            style={closeBtnStyles}
          >
            <CloseOutlined style={closeIconStyles} />
          </button>
        </div>
      }
      styles={drawerStyles}
      closeIcon={false}
      destroyOnClose
    >
      <AddTaskForm />
    </Drawer>
  );
};
