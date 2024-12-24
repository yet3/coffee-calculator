import { Pressable, type PressableProps, type ViewStyle } from "react-native";
import { type IAutoStyles, useAutoStyles } from "./Hooks/useAutoStyles";

type IProps = PressableProps & IAutoStyles;

export const UiPressable = ({ children, ...props }: IProps) => {
	const autoStyles = useAutoStyles(props);

	return (
		<Pressable {...props} style={[props.style as ViewStyle, autoStyles]}>
			{children}
		</Pressable>
	);
};
