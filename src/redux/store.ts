import { configureStore } from '@reduxjs/toolkit';

import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import sidebarSlice from "@/redux/slices/sidebarSlice.ts";
import systemSlice from "@/redux/slices/systemSlice.ts";
import workspaceSlice from "@/redux/slices/workspaceSlice.ts";
import pageSlice from "@/redux/slices/pageSlice.ts";


export const store = configureStore({
	reducer: {
		workspace: workspaceSlice,
		sidebar: sidebarSlice,
		system: systemSlice,
		page: pageSlice
	},
});

// 定义 RootState 和 AppDispatch 类型
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
