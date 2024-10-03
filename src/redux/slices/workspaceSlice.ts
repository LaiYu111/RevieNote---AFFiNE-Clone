import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PageDB, WorkspaceDB} from "@/db/schemas.ts";
import {dbService} from "@/db";
import {isNull} from "lodash";
import {v4 as uuidv4} from "uuid";
import {getTimestamp} from "@/utils.ts";





interface WorkspaceState {
	currentWorkspace: WorkspaceDB | null
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: WorkspaceState = {
	currentWorkspace: null,
	status: 'idle',
	error: null,
}

export const updateWorkspaceAsync = createAsyncThunk<
	WorkspaceDB | null, // fulfilled 返回类型
	WorkspaceDB | null, // thunk 返回类型
	{
		rejectValue: string  // rejectWithValue 返回类型
	}
>(
	'workspace/updateWorkspace',
	async (workspace, { rejectWithValue }) => {
		if (!workspace) {
			return rejectWithValue('Index is null');
		}
		try {
			await dbService.updateWorkspace(workspace);
			return workspace;
		} catch (err) {
			return rejectWithValue((err as Error).message || 'Unknown error');
		}
	}
)


export const fetchDefaultWorkspaceAsync = createAsyncThunk(
	'workspace/fetchDefaultWorkspace',
	async (_, { rejectWithValue }) => {
		try {
			let defaultWorkspace = await dbService.getDefaultWorkspace();
			if (isNull(defaultWorkspace)){
				const newWorkspace: WorkspaceDB = {
					id: uuidv4(),
					title: 'Default Index',
					pages: [],
					defaultWorkspace: true,
					createdAt: getTimestamp(),
					updatedAt: getTimestamp(),
				};
				await dbService.addWorkspace(newWorkspace);
				defaultWorkspace = newWorkspace
			}
			return defaultWorkspace
		} catch (error) {
			return rejectWithValue(error);
		}
	}
)

export const addPageAsync = createAsyncThunk<
	WorkspaceDB, // fulfilled 返回类型
	PageDB,      // thunk 参数类型
	{
		state: { workspace: WorkspaceState };
		rejectValue: string;
	}
>(
	'workspace/addPage',
	async (page, { getState, rejectWithValue }) => {
		const { currentWorkspace } = getState().workspace;
		if (!currentWorkspace) {
			return rejectWithValue('当前工作区为空');
		}
		try {
			const updatedPages = [...currentWorkspace.pages, page];
			const updatedWorkspace = { ...currentWorkspace, pages: updatedPages };
			await dbService.updateWorkspace(updatedWorkspace);
			return updatedWorkspace;
		} catch (err) {
			return rejectWithValue((err as Error).message || '未知错误');
		}
	}
);



const workspaceSlice = createSlice({
	name: 'workspace',
	initialState,
	reducers: {
		initWorkspace(state, action) {
			state.currentWorkspace = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateWorkspaceAsync.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(updateWorkspaceAsync.fulfilled, (state, action: PayloadAction<WorkspaceDB | null>) => {
				state.status = 'succeeded';
				state.currentWorkspace = action.payload;
			})
			.addCase(updateWorkspaceAsync.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});

		builder
			.addCase(fetchDefaultWorkspaceAsync.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchDefaultWorkspaceAsync.fulfilled, (state, action: PayloadAction<WorkspaceDB | null>) => {
				state.status = 'succeeded';
				state.currentWorkspace = action.payload;
			})
			.addCase(fetchDefaultWorkspaceAsync.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});

		builder
			.addCase(addPageAsync.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(addPageAsync.fulfilled, (state, action: PayloadAction<WorkspaceDB>) => {
				state.status = 'succeeded';
				state.currentWorkspace = action.payload;
			})
			.addCase(addPageAsync.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});
	}
});

export const {
	initWorkspace,

} = workspaceSlice.actions;
export default workspaceSlice.reducer;
