"use client";
import store from "@/store/store";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
export const MyProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={{
        components: {
          Table: {
            headerBg: "transparent", 
            cellPaddingBlock: 5
          },
          Form: {
            labelColor: "#9E9EA6"
          }
        }
      }}>{children}</ConfigProvider>
    </Provider>
  );
};
