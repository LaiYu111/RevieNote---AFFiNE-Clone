import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SidebarStateType {
	isOpen: boolean
	width: number,
	MIN_WIDTH: number,
	MAX_WIDTH: number,
	CLOSED_WIDTH: number,
	DEFAULT_WIDTH: number
}

const initialState: SidebarStateType = {
	isOpen: true,
	width: 300,
	MAX_WIDTH: 500,
	MIN_WIDTH: 200,
	CLOSED_WIDTH: 0,
	DEFAULT_WIDTH: 300
}

const sidebarSlice = createSlice({
	name: 'menu',
	initialState: initialState,
	reducers: {
		openSidebar(state) {
			state.isOpen = true;
			state.width = state.DEFAULT_WIDTH
		},
		closeSidebar(state) {
			state.isOpen = false;
			state.width = state.CLOSED_WIDTH
		},
		setWidth(state, action: PayloadAction<number>) {
			state.width = action.payload;
		},
	}
})

export const {
	openSidebar,
	closeSidebar,
	setWidth
} = sidebarSlice.actions;
export default sidebarSlice.reducer;
