import { useMemo } from "react";
import type { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { AUTO_STYLES_MAPPINGS, type IAutoStyles } from "./stylesMappings";

type IStyle = ViewStyle & TextStyle & ImageStyle;

export const useAutoStyles = (props: IAutoStyles): IStyle => {
	// biome-ignore lint lint/correctness/useExhaustiveDependencies:
	return useMemo(
		() => {
			const style: IStyle = {};

			for (const key in AUTO_STYLES_MAPPINGS) {
				const styleName = AUTO_STYLES_MAPPINGS[key as keyof IAutoStyles];
				if (Object.hasOwn(props, key)) {
					(style[styleName] as unknown) = props[key as keyof IAutoStyles];
				}
			}

			return style;
		},
		Object.keys(AUTO_STYLES_MAPPINGS).map(
			(key) => props[key as keyof IAutoStyles],
		),
	);
};
