import {
	SafeAreaView,
	type SafeAreaViewProps,
} from "react-native-safe-area-context";
import { type IAutoStyles, useAutoStyles } from "./Hooks/useAutoStyles";

type IProps = SafeAreaViewProps & IAutoStyles;

export const UiSafeAreaView = ({ children, ...props }: IProps) => {
	const autoStyles = useAutoStyles(props);

	return (
		<SafeAreaView
			edges={{
				top: "additive",
				left: "additive",
				right: "additive",
				bottom: "off",
			}}
			{...props}
			style={[props.style, autoStyles]}
		>
			{children}
		</SafeAreaView>
	);
};
