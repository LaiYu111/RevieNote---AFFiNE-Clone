import { configureStore } from '@reduxjs/toolkit';

import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import counterSlice from "@/redux/slices/counterSlice.ts";
import sidebarSlice from "@/redux/slices/sidebarSlice.ts";
import systemSlice from "@/redux/slices/systemSlice.ts";


export const store = configureStore({
	reducer: {
		counter: counterSlice,
		sidebar: sidebarSlice,
		system: systemSlice
	},
});

// 定义 RootState 和 AppDispatch 类型
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
