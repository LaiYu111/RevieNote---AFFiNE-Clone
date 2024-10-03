import IndexedDBService from "@/db/IndexedDBService.ts";
import {dbName, dbWorkspace} from "@/db/contants.ts";

export const dbService = new IndexedDBService(dbName, dbWorkspace)
