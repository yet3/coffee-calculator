import { CoffeeUnit, WaterUnit } from "@typings/units.types";

export const formatUnitFull = (unit: CoffeeUnit | WaterUnit): string => {
	switch (unit) {
		case CoffeeUnit.g:
			return "Gram";
		case CoffeeUnit.lb:
			return "Pound";
		case CoffeeUnit.oz:
			return "Ounce";

		case WaterUnit.l:
			return "Liter";
		case WaterUnit.ml:
			return "Milliliter";
		case WaterUnit.fl_oz_imp:
			return "Fluid ounce imperial";
		case WaterUnit.fl_oz_us:
			return "Fluid ounce us";
	}
};

export const formatUnitShorthand = (unit: CoffeeUnit | WaterUnit): string => {
	switch (unit) {
		case CoffeeUnit.g:
			return "g";
		case CoffeeUnit.lb:
			return "lb";
		case CoffeeUnit.oz:
			return "oz";

		case WaterUnit.l:
			return "l";
		case WaterUnit.ml:
			return "ml";
		case WaterUnit.fl_oz_imp:
			return "fl oz";
		case WaterUnit.fl_oz_us:
			return "fl oz";
	}
};
