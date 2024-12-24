import { statsStorage } from "@stores/index";
import type { IDrankCoffeeRecord } from "@typings/stats.types";
import { useMMKVObject } from "react-native-mmkv";
import { useCalculatorFacade } from "./useCalculatorFacade";

export const useCurrentStatistics = () => {
	const year = new Date().getUTCFullYear();
	const [, setDrankCoffee] = useMMKVObject<IDrankCoffeeRecord[]>(
		`drank_coffee_${year}`,
		statsStorage,
	);

	const { waterAmt, groundsAmt, portions } = useCalculatorFacade();

	return {
		addDrankCoffee: () => {
			setDrankCoffee((prevDrankCoffee) => {
				const tmp = [...(prevDrankCoffee ?? [])];
				tmp.push({
					timestamp: new Date().getTime(),
					portions: portions,
					grounds: groundsAmt,
					water: waterAmt,
				});
				return tmp;
			});
		},
	};
};
