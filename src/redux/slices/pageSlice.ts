import {PageDB} from "@/db/schemas.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {dbService} from "@/db";


interface PageState {
	currentPage: PageDB | null
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: PageState = {
	currentPage: null,
	status: 'idle',
	error: null,
}

export const fetchPage = createAsyncThunk<
	PageDB, // 成功时返回的类型
	{ pageId: string; workspaceId: string }, // thunk 参数的类型
	{
		state: { page: PageState };
		rejectValue: string;
	}
>(
	'page/fetchPage',
	async ({ pageId, workspaceId }, { rejectWithValue }) => {
		try {
			const page = await dbService.getPage(workspaceId, pageId);
			if (page) {
				return page;
			} else {
				return rejectWithValue('Page not found');
			}
		} catch (error) {
			return rejectWithValue((error as Error).message || 'Unknown error');
		}
	}
);

export const updatePageAsync = createAsyncThunk<
	PageDB, // 成功时返回的类型（更新后的页面）
	Partial<PageDB> & { pageId: string; workspaceId: string }, // thunk 参数的类型
	{
		rejectValue: string;
	}
>(
	'page/updatePage',
	async (pageData, { rejectWithValue }) => {
		const { pageId, workspaceId, ...updates } = pageData;
		try {
			const workspace = await dbService.getWorkspaceById(workspaceId);
			if (!workspace) {
				return rejectWithValue('Workspace not found');
			}

			const pageIndex = workspace.pages.findIndex((p) => p.id === pageId);
			if (pageIndex === -1) {
				return rejectWithValue('Page not found');
			}

			const updatedPage: PageDB = {
				...workspace.pages[pageIndex],
				...updates,
				updatedAt: Date.now(),
			};

			workspace.pages[pageIndex] = updatedPage;

			await dbService.updateWorkspace(workspace);

			return updatedPage;
		} catch (err) {
			return rejectWithValue((err as Error).message || '未知错误');
		}
	}
);

const pageSlice = createSlice({
	name: 'page',
	initialState,
	reducers: {
		initPage(state, action){
			state.currentPage = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPage.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchPage.fulfilled, (state, action: PayloadAction<PageDB>) => {
				state.status = 'succeeded';
				state.currentPage = action.payload;
			})
			.addCase(fetchPage.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});

		builder
			.addCase(updatePageAsync.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(updatePageAsync.fulfilled, (state, action: PayloadAction<PageDB>) => {
				state.status = 'succeeded';
				state.currentPage = action.payload;
			})
			.addCase(updatePageAsync.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});
	}
})

export const {
	initPage
} = pageSlice.actions;
export default pageSlice.reducer;
