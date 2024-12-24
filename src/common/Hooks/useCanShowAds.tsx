import { useMMKVBoolean } from "react-native-mmkv";

export const useCanShowAds = () => {
	const [val, setCanShowAds] = useMMKVBoolean("can-show-ads");
	return { canShowAds: val ?? false, setCanShowAds };
};
