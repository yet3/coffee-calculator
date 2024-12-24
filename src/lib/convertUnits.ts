import { CoffeeUnit, WaterUnit } from "@typings/units.types";

const round = (num: number): number => {
	return Math.round(num * 100) / 100;
};

export const convertToMl = (value: number, unit: WaterUnit): number => {
	let val = value;
	switch (unit) {
		case WaterUnit.fl_oz_imp:
			val = value * 28.41306;
			break;
		case WaterUnit.fl_oz_us:
			val = value * 29.57353;
			break;
		case WaterUnit.l:
			val = value * 1000;
			break;
		case WaterUnit.ml:
			val = value;
			break;
	}
	return round(val);
};

export const convertFromMl = (value: number, unit: WaterUnit): number => {
	let val = value;
	switch (unit) {
		case WaterUnit.fl_oz_imp:
			val = value / 28.41306;
			break;
		case WaterUnit.fl_oz_us:
			val = value / 29.57353;
			break;
		case WaterUnit.l:
			val = value / 1000;
			break;
		case WaterUnit.ml:
			val = value;
			break;
	}
	return round(val);
};

export const convertToGrams = (value: number, unit: CoffeeUnit): number => {
	let val = value;
	switch (unit) {
		case CoffeeUnit.oz:
			val = value * 28.34952;
			break;
		case CoffeeUnit.lb:
			val = value * 453.5924;
			break;
		case CoffeeUnit.g:
			val = value;
			break;
	}
	return round(val);
};

export const convertFromGrams = (value: number, unit: CoffeeUnit): number => {
	let val = value;
	switch (unit) {
		case CoffeeUnit.oz:
			val = value / 28.34952;
			break;
		case CoffeeUnit.lb:
			val = value / 453.5924;
			break;
		case CoffeeUnit.g:
			val = value;
			break;
	}
	return round(val);
};
