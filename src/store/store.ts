import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice";
import statusesSlice from "./statusesSlice";
import usersSlice from "./usersSlice";
import tagsSlice from "./tagsSlice";
import prioritiesSlice from "./prioritiesSlice";
import drawersSlice from "./drawersSlice";

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    statuses: statusesSlice,
    users: usersSlice,
    tags: tagsSlice,
    priorities: prioritiesSlice,
    drawers: drawersSlice,
  },
});

// Выводим вспомогательные типы

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
