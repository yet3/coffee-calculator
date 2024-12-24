import { View, type ViewProps } from "react-native";
import { type IAutoStyles, useAutoStyles } from "./Hooks/useAutoStyles";

type IProps = ViewProps & IAutoStyles;

export const UiView = ({ children, ...props }: IProps) => {
	const autoStyles = useAutoStyles(props);

	return (
		<View {...props} style={[props.style, autoStyles]}>
			{children}
		</View>
	);
};
