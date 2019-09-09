// storage.js
import { storageFactory } from "storage-factory";

export const session = storageFactory(() => localStorage);
