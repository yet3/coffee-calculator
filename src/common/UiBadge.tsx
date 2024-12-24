import { FontSize, THEME } from "@lib/theme";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, type ViewStyle } from "react-native";
import { UiText } from "./UiText";

export enum BadgeSize {
	sm = "sm",
	md = "md",
	lg = "lg",
}

export enum BadgeVariant {
	accent = "accent",
}

interface IProps {
	style?: ViewStyle;
	icon?: ReactNode;
	label: string;

	isSelected?: boolean;
	onPress?: () => void;

	size?: BadgeSize;
	variant?: BadgeVariant;
}

export const UiBadge = ({
	style,
	icon,
	label,
	size = BadgeSize.md,
	variant = BadgeVariant.accent,

	isSelected,
	onPress,
}: IProps) => {
	const colors = colorVariants[variant];
	return (
		<Pressable
			onPress={onPress}
			style={[
				style,
				styles.container,
				containerSizeStyles[size],
				{
					backgroundColor: isSelected ? colors.bgColor : "transparent",
					borderColor: colors.bgColor,
				},
			]}
		>
			{icon}
			<UiText
				content={label}
				color={isSelected ? colors.selectedTextColor : colors.bgColor}
				size={textSize[size]}
			/>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: THEME.rounded.xl4,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 8,
	},
});

const containerSizeStyles = StyleSheet.create({
	[BadgeSize.sm]: {
		paddingHorizontal: 8,
		paddingVertical: 6,
	},
	[BadgeSize.md]: {
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	[BadgeSize.lg]: {
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
});

const colorVariants: Record<
	BadgeVariant,
	{ bgColor: string; selectedTextColor: string }
> = {
	[BadgeVariant.accent]: {
		bgColor: THEME.accent,
		selectedTextColor: THEME.white,
	},
};

const textSize: Record<BadgeSize, FontSize> = {
	[BadgeSize.sm]: FontSize.md,
	[BadgeSize.md]: FontSize.lg,
	[BadgeSize.lg]: FontSize.xl,
};
