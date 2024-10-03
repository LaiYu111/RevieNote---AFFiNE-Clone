import { DBSchema, openDB } from 'idb';
import {INDEXEDDB_NAME} from "@/config.ts";

interface ReviewNoteDB extends DBSchema {
	workspace: {
		key: string; // 必须定义key类型
		value: {
			_id: string;
			name: string;
		};
	};
}

const initDB = async () => {
	return openDB<ReviewNoteDB>(INDEXEDDB_NAME, 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains('workspace')) {
				db.createObjectStore('workspace', { keyPath: '_id' }); // 创建名为 'workspace' 的对象存储
			}
		},
	});
};

export default initDB;
