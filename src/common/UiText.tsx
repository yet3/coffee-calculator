import { useTextTheme } from "@contexts/useTextTheme";
import { type FontSize, FontWeight, THEME } from "@lib/theme";
import { Text, type TextProps } from "react-native";
import { type IAutoStyles, useAutoStyles } from "./Hooks/useAutoStyles";

interface IProps extends TextProps, IAutoStyles {
	content?: string;
	color?: string;
	size?: FontSize;
	weight?: FontWeight;
}

export const UiText = ({
	children,
	content,
	color,
	size,
	weight,
	...props
}: IProps) => {
	const textTheme = useTextTheme();
	const autoStyles = useAutoStyles(props);

	return (
		<Text
			{...props}
			style={[
				{
					color: color ?? textTheme?.color ?? THEME.bgContent,
					fontSize: size ? THEME.fontSize[size] : textTheme?.size,
					fontFamily:
						weight === FontWeight.bold
							? "LatoBlack"
							: weight === FontWeight.medium
								? "LatoBold"
								: "Lato",
				},
				props.style,
				autoStyles,
			]}
		>
			{children ?? content}
		</Text>
	);
};
