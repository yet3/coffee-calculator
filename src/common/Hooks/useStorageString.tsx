import { useMMKVString } from "react-native-mmkv";

type IReturn = [
	string,
	(
		value:
			| string
			| ((current: string | undefined) => string | undefined)
			| undefined,
	) => void,
];

export const useStorageString = (key: string, def: string): IReturn => {
	const [val, setVal] = useMMKVString(key);
	return [val ?? def, setVal];
};
