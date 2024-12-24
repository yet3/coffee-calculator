import { TextThemeCtxProvider } from "@contexts/useTextTheme";
import { FontSize, THEME } from "@lib/theme";
import {
	Pressable,
	type PressableProps,
	StyleSheet,
	type ViewStyle,
} from "react-native";
import { UiText } from "./UiText";
import { type IAutoStyles, useAutoStyles } from "./Hooks/useAutoStyles";
import { ReactNode } from "react";

export enum BtnVariant {
	primary = "primary",
	danger = "danger",
}

export enum BtnKind {
	ghost = "ghost",
	solid = "solid",
}

export enum BtnSize {
	md = "md",
	lg = "lg",
}

interface IProps extends PressableProps, IAutoStyles {
	title?: string;
  icon?: ReactNode,

	size?: BtnSize;
	kind?: BtnKind;
	variant?: BtnVariant;
}

export const UiButton = ({
	title,
  icon,
	size = BtnSize.md,
	kind = BtnKind.ghost,
	variant = BtnVariant.primary,
	children,
	disabled,
	...props
}: IProps) => {
	const autoStyles = useAutoStyles(props);

	const sizeData = BTN_SIZE_DATA[size];
	const colorData = BTN_COLOR_DATA[variant];
	let bgColor = "transparent";
	const textColor = colorData.textColor;
	if (kind === BtnKind.solid) {
		bgColor = colorData.bgColor;
	}

	return (
		<TextThemeCtxProvider
			theme={{
				color: textColor,
				size: sizeData.textSize,
			}}
		>
			<Pressable
				{...props}
				disabled={disabled}
				style={[
					props.style as ViewStyle,
					styles.container,
					{
						borderRadius: sizeData.borderRadius,
						backgroundColor: bgColor,
						paddingVertical: sizeData.paddingY,
						paddingHorizontal: sizeData.paddingX,
						filter: disabled ? "brightness(0.75)" : undefined,
					},
					autoStyles,
				]}
			>
				{children ? children : <UiText>{title}</UiText>}
			</Pressable>
		</TextThemeCtxProvider>
	);
};

type BtnColorData = Record<
	BtnVariant,
	{
		textColor: string;
		bgColor: string;
	}
>;

const BTN_COLOR_DATA: BtnColorData = {
	[BtnVariant.primary]: {
		textColor: THEME.accent,
		bgColor: THEME.primary,
	},
	[BtnVariant.danger]: {
		textColor: THEME.danger,
		bgColor: THEME.primary,
	},
};

type BtnSizeData = Record<
	BtnSize,
	{
		textSize: number;
		paddingY: number;
		paddingX: number;
		borderRadius: number;
	}
>;

const BTN_SIZE_DATA: BtnSizeData = {
	[BtnSize.md]: {
		textSize: THEME.fontSize[FontSize.xl],
		paddingY: 8,
		paddingX: 16,
		borderRadius: THEME.rounded.xl4,
	},
	[BtnSize.lg]: {
		textSize: THEME.fontSize[FontSize.xl],
		paddingY: 12,
		paddingX: 24,
		borderRadius: THEME.rounded.xl4,
	},
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
});
