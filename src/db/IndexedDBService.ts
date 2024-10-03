import { PageDB, WorkspaceDB } from "@/db/schemas.ts";

class IndexedDBService {
	private dbName: string;
	private workspaceStoreName: string;
	private dbPromise: Promise<IDBDatabase>;

	constructor(dbName: string, workspaceStoreName: string) {
		this.dbName = dbName;
		this.workspaceStoreName = workspaceStoreName;
		this.dbPromise = this.initDB();
	}

	private async initDB(): Promise<IDBDatabase> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.dbName, 1);

			request.onerror = () => reject(`Error opening database: ${request.error}`);
			request.onsuccess = () => resolve(request.result);
			request.onupgradeneeded = (event) => {
				const db = (event.target as IDBOpenDBRequest).result;
				if (!db.objectStoreNames.contains(this.workspaceStoreName)) {
					db.createObjectStore(this.workspaceStoreName, { keyPath: 'id' });
				}
			};
		});
	}

	async addWorkspace(workspace: WorkspaceDB): Promise<void> {
		const db = await this.dbPromise;
		const transaction = db.transaction(this.workspaceStoreName, 'readwrite');
		const store = transaction.objectStore(this.workspaceStoreName);
		store.add(workspace);
		await this._completeTransaction(transaction);
	}

	async getWorkspaceById(id: string): Promise<WorkspaceDB | undefined> {
		const db = await this.dbPromise;
		const transaction = db.transaction(this.workspaceStoreName, 'readonly');
		const store = transaction.objectStore(this.workspaceStoreName);
		const request = store.get(id);
		return await this._requestAsPromise(request);
	}

	async getAllWorkspaces(): Promise<WorkspaceDB[]> {
		const db = await this.dbPromise;
		const transaction = db.transaction(this.workspaceStoreName, 'readonly');
		const store = transaction.objectStore(this.workspaceStoreName);
		const request = store.getAll();
		return await this._requestAsPromise(request);
	}

	async getDefaultWorkspace(): Promise<WorkspaceDB | null> {
		const workspaces = await this.getAllWorkspaces();
		const defaultWorkspace = workspaces.find(workspace => workspace.defaultWorkspace);
		return defaultWorkspace ?? null;
	}

	async updateWorkspace(workspace: WorkspaceDB): Promise<void> {
		const db = await this.dbPromise;
		const transaction = db.transaction(this.workspaceStoreName, 'readwrite');
		const store = transaction.objectStore(this.workspaceStoreName);
		store.put(workspace);
		await this._completeTransaction(transaction);
	}

	async deleteWorkspaceById(id: string): Promise<void> {
		const db = await this.dbPromise;
		const transaction = db.transaction(this.workspaceStoreName, 'readwrite');
		const store = transaction.objectStore(this.workspaceStoreName);
		store.delete(id);
		await this._completeTransaction(transaction);
	}

	async getPage(workspaceId: string, pageId: string): Promise<PageDB | undefined> {
		const workspace = await this.getWorkspaceById(workspaceId);
		return workspace?.pages.find(p => p.id === pageId);
	}

	private async _completeTransaction(transaction: IDBTransaction): Promise<void> {
		return new Promise((resolve, reject) => {
			transaction.oncomplete = () => resolve();
			transaction.onerror = () => reject(transaction.error);
		});
	}

	private async _requestAsPromise<T>(request: IDBRequest): Promise<T> {
		return new Promise((resolve, reject) => {
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}
}

export default IndexedDBService;
