import { FC } from "react";

import { CloseOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { EditTaskForm } from "../EditTaskForm/EditTaskForm";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { toggleEditTaskDrawer } from "@/store/drawersSlice";

const drawerStyles = {
  header: {
    backgroundColor: "#1A4876",
    color: "#FFFFFF",
    padding: "24px 24px",
  },
  body: {
    backgroundColor: "#ECF3F7",
    padding: 36,
  },
};
const drawerTitleStyles: React.CSSProperties = {
  display: "flex",
  gap: 20,
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
  marginLeft: "auto",
};

export const EditTaskDrawer: FC = () => {
  const { editedTask } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawers.editTaskDrawerState
  );

  return (
    <Drawer
      title={
        <div style={drawerTitleStyles}>
          <span>№{editedTask?.id}</span>
          <span>{editedTask?.name}</span>
          <button
            onClick={() => dispatch(toggleEditTaskDrawer(false))}
            style={closeBtnStyles}
          >
            <CloseOutlined style={closeIconStyles} />
          </button>
        </div>
      }
      placement="right"
      onClose={() => dispatch(toggleEditTaskDrawer(false))}
      open={isDrawerOpen}
      width={976}
      mask={false}
      styles={drawerStyles}
      closeIcon={false}
      destroyOnClose
    >
      {editedTask && <EditTaskForm key={editedTask.id} />}
    </Drawer>
  );
};
