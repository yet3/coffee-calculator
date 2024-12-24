import type { IRatio } from "@typings/calculator.types";
import { CoffeeUnit, WaterUnit } from "@typings/units.types";
import { Dimensions } from "react-native";

const windowDimensions = Dimensions.get("window");
export const SCREEN_WIDTH = windowDimensions.width;
export const SCREEN_HEIGHT = windowDimensions.height;

export const DEFAULT_GROUNDS_AMT = 15;
export const DEFAULT_WATER_AMT = 240;
export const DEFAULT_RATIO = DEFAULT_GROUNDS_AMT / DEFAULT_WATER_AMT;

export const DEFAULT_GROUNDS_UNIT = CoffeeUnit.g;
export const DEFAULT_WATER_UNIT = WaterUnit.ml;

//TODO: move to state,
export const RATIOS: IRatio[] = [
	{
		name: "1:1.5",
		ratio: 1 / 1.5,
	},
	{
		name: "1:2",
		ratio: 1 / 2,
	},
	{
		name: "1:3",
		ratio: 1 / 3,
	},
	{
		name: "1:4",
		ratio: 1 / 4,
	},
	{
		name: "1:5",
		ratio: 1 / 5,
	},
	{
		name: "1:6",
		ratio: 1 / 6,
	},
	{
		name: "1:7",
		ratio: 1 / 7,
	},
	{
		name: "1:8",
		ratio: 1 / 8,
	},
	{
		name: "1:9",
		ratio: 1 / 9,
	},
	{
		name: "1:10",
		ratio: 1 / 10,
	},
	{
		name: "1:12",
		ratio: 1 / 12,
	},
	{
		name: "1:14",
		ratio: 1 / 14,
	},
	{
		name: "1:15",
		ratio: 1 / 15,
	},
	{
		name: "1:16",
		ratio: 1 / 16,
	},
	{
		name: "1:17",
		ratio: 1 / 17,
	},
	{
		name: "1:18",
		ratio: 1 / 18,
	},
];
