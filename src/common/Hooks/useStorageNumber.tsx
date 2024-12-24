import { useMMKVNumber } from "react-native-mmkv";

type IReturn = [
	number,
	(
		value:
			| number
			| ((current: number | undefined) => number | undefined)
			| undefined,
	) => void,
];

export const useStorageNumber = (key: string, def: number): IReturn => {
	const [val, setVal] = useMMKVNumber(key);
	return [val ?? def, setVal];
};
