export interface PageDB{
	id: string
	title: string
	editorStatus: null | string // 只能存放 JSON.stringify(editor.getEditorState().toJSON());
	createdAt: number
	updatedAt: number
}

export interface WorkspaceDB {
	id: string
	title: string
	pages: PageDB[]
	icon?: string
	defaultWorkspace: boolean
	createdAt: number
	updatedAt: number
}
