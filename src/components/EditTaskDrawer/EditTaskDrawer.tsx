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
    padding: "20px 24px",
  },
  body: {
    backgroundColor: "#ECF3F7",
  },
};

const closeIconStyles = { color: "white", fontSize: "20px" };

export const EditTaskDrawer: FC = () => {
  const { editedTask } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const isDrawerOpen = useSelector(
    (state: RootState) => state.drawers.editTaskDrawerState
  );

  return (
    <Drawer
      title={
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span>№{editedTask?.id}</span>
          <span>{editedTask?.name}</span>
        </div>
      }
      placement="right"
      onClose={() => dispatch(toggleEditTaskDrawer(false))}
      open={isDrawerOpen}
      size="large"
      mask={false}
      styles={drawerStyles}
      closeIcon={<CloseOutlined style={closeIconStyles} />}
      destroyOnClose
    >
      {editedTask && <EditTaskForm key={editedTask.id} />}
    </Drawer>
  );
};
