"use client";
import store from "@/store/store";
import { Provider } from "react-redux";
export const MyProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
