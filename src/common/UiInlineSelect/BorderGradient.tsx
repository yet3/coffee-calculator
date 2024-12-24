import { UiView } from "@common/UiView";
import { THEME } from "@lib/theme";
import { StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";

interface IBorderGradientProps {
	pos: "top" | "bottom";
}

export const InlineSelectBorderGradient = ({ pos }: IBorderGradientProps) => {
	return (
		<UiView style={[styles.container, styles[pos]]} pointerEvents="none">
			<Svg width={"100%"} height={"100%"}>
				<Defs>
					<LinearGradient
						id="grad1"
						x1="0%"
						x2="0%"
						y1={pos === "bottom" ? "100%" : "0%"}
						y2={pos === "top" ? "100%" : "0%"}
					>
						<Stop offset="0%" stopColor={THEME.bg} />
						<Stop offset="100%" stopColor={THEME.bg} stopOpacity={0} />
					</LinearGradient>
				</Defs>
				<Rect x={0} y={0} width="100%" height="100%" fill="url(#grad1)" />
			</Svg>
		</UiView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 40,
		position: "absolute",
		zIndex: 1,
	},
	top: {
		top: 0,
		left: 0,
	},
	bottom: {
		bottom: 0,
		left: 0,
	},
});
