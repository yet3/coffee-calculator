import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const statsStorage = new MMKV({
	id: "user-statistics-storage",
});
