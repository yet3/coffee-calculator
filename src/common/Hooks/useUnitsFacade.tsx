import { useStorageString } from "@common/Hooks/useStorageString";
import { DEFAULT_GROUNDS_UNIT, DEFAULT_WATER_UNIT } from "@lib/consts";
import type { CoffeeUnit, WaterUnit } from "@typings/units.types";

export const useUnitsFacade = () => {
	const [waterUnit, setWaterUnit] = useStorageString(
		"units.water",
		DEFAULT_WATER_UNIT,
	);

	const [coffeeUnit, setCoffeeUnit] = useStorageString(
		"coffee.water",
		DEFAULT_GROUNDS_UNIT,
	);

	return {
		coffeeUnit: coffeeUnit as CoffeeUnit,
		setCoffeeUnit,

		waterUnit: waterUnit as WaterUnit,
		setWaterUnit,
	};
};
