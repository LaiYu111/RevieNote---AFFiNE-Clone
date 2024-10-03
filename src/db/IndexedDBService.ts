import {PageDB, WorkspaceDB} from "@/db/schemas.ts";

class IndexedDBService {
	private dbName: string;
	private workspaceStoreName: string;
	private dbPromise: Promise<IDBDatabase>;

	constructor(dbName: string, workspaceStoreName: string) {
		this.dbName = dbName;
		this.workspaceStoreName = workspaceStoreName;
		this.dbPromise = this.initDB();
	}

	private initDB(): Promise<IDBDatabase> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.dbName, 1);

			request.onerror = () => {
				reject(`Error opening database: ${request.error}`);
			};

			request.onsuccess = () => {
				resolve(request.result);
			};

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

		return new Promise((resolve, reject) => {
			transaction.oncomplete = () => resolve();
			transaction.onerror = () => reject(transaction.error);
		});
	}

	async getWorkspaceById(id: string): Promise<WorkspaceDB | undefined> {
		const db = await this.dbPromise;
		const transaction = db.transaction(this.workspaceStoreName, 'readonly');
		const store = transaction.objectStore(this.workspaceStoreName);
		const request = store.get(id);

		return new Promise((resolve, reject) => {
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	async getAllWorkspaces(): Promise<WorkspaceDB[]> {
		const db = await this.dbPromise;
		const transaction = db.transaction(this.workspaceStoreName, 'readonly');
		const store = transaction.objectStore(this.workspaceStoreName);
		const request = store.getAll();

		return new Promise((resolve, reject) => {
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	async getDefaultWorkspace(): Promise<WorkspaceDB | null> {
		const db = await this.dbPromise;
		const transaction = db.transaction(this.workspaceStoreName, 'readonly');
		const store = transaction.objectStore(this.workspaceStoreName);

		return new Promise((resolve, reject) => {
			const request = store.getAll(); // 获取所有工作区

			request.onsuccess = () => {
				const workspaces: WorkspaceDB[] = request.result;

				const defaultWorkspace = workspaces.find(workspace => workspace.defaultWorkspace);

				if (defaultWorkspace) {
					resolve(defaultWorkspace);
				} else {
					resolve(null);
				}
			};

			request.onerror = () => {
				reject(request.error);
			};
		});
	}

	async updateWorkspace(workspace: WorkspaceDB): Promise<void> {
		const db = await this.dbPromise;
		const transaction = db.transaction(this.workspaceStoreName, 'readwrite');
		const store = transaction.objectStore(this.workspaceStoreName);
		store.put(workspace);

		return new Promise((resolve, reject) => {
			transaction.oncomplete = () => resolve();
			transaction.onerror = () => reject(transaction.error);
		});
	}

	async deleteWorkspaceById(id: string): Promise<void> {
		const db = await this.dbPromise;
		const transaction = db.transaction(this.workspaceStoreName, 'readwrite');
		const store = transaction.objectStore(this.workspaceStoreName);
		store.delete(id);

		return new Promise((resolve, reject) => {
			transaction.oncomplete = () => resolve();
			transaction.onerror = () => reject(transaction.error);
		});
	}

	async getPage(workspaceId: string, pageId: string): Promise<PageDB | undefined> {
		const db = await this.dbPromise;
		const transaction = db.transaction(this.workspaceStoreName, 'readonly');
		const store = transaction.objectStore(this.workspaceStoreName);
		const request = store.get(workspaceId);

		return new Promise((resolve, reject) => {
			request.onsuccess = () => {
				const workspace: WorkspaceDB = request.result;
				if (workspace) {
					const page = workspace.pages.find((p) => p.id === pageId);
					resolve(page);
				} else {
					resolve(undefined);
				}
			};
			request.onerror = () => {
				reject(request.error);
			};
		});
	}
}

export default IndexedDBService
