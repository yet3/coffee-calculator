import { useStorageNumber } from "@common/Hooks/useStorageNumber";
import {
	DEFAULT_GROUNDS_AMT,
	DEFAULT_RATIO,
	DEFAULT_WATER_AMT,
	RATIOS,
} from "@lib/consts";
import { useMemo } from "react";
import { useMMKVString } from "react-native-mmkv";
import { useStorageString } from "./useStorageString";

// TODO: rename groundsAmt to groundsAmt
export const useCalculatorFacade = () => {
	const [selectedRatioName, setSelectedRatioName] =
		useMMKVString("selectedRatioName");

	const [customRatio, setCustomRatio] = useStorageString("customRatio", "1:16");

	const [groundsAmt, setGroundsAmt] = useStorageNumber(
		"grounds",
		DEFAULT_GROUNDS_AMT,
	);
	const [waterAmt, setWaterAmt] = useStorageNumber("water", DEFAULT_WATER_AMT);
	const [portions, setPortions] = useStorageNumber("portions", 1);

	const customRatioValues = useMemo(() => {
		const split = customRatio.split(":");
		return [Number(split[0] ?? "1"), Number(split[1] ?? "16")];
	}, [customRatio]);

	const ratio = useMemo(() => {
		if (selectedRatioName === "custom") {
			return customRatioValues[0] / customRatioValues[1];
		}

		return (
			RATIOS.find((e) => e.name === selectedRatioName)?.ratio ?? DEFAULT_RATIO
		);
	}, [selectedRatioName, customRatioValues]);

	return {
		customRatioValues,
		setCustomRatio: setCustomRatio,

		selectedRatioName,
		setSelectedRatioName,

		ratio,

		groundsAmt,
		setGroundsAmt,

		waterAmt,
		setWaterAmt,

		portions,
		setPortions,
	};
};
