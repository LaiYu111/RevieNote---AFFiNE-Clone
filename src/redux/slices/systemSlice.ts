import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TSystemStatus} from "@/redux/types.ts";

interface SystemProps {
	status: TSystemStatus
}

const initialState: SystemProps = {
	status: navigator.onLine? 'online' : "offline"
}

const systemSlice = createSlice({
	name: 'system',
	initialState: initialState,
	reducers: {
		setStatus(state, action: PayloadAction<TSystemStatus>) {
			state.status = action.payload;
		},
	}
})

export const {
	setStatus
} = systemSlice.actions;
export default systemSlice.reducer;
