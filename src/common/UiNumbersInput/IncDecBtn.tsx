import { Feather } from "@expo/vector-icons";
import { THEME } from "@lib/theme";
import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import { type SetStateAction, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface IProps {
	type: "inc" | "dec";
	step: number;
	// changeValueBy: (by: number) => void;
	value: number;
	onChange: (val: number) => void;
	// minMaxValue: (val: number) => number;
}

export const IncDecBtn = ({ type, value, onChange, step }: IProps) => {
	const isLongedPressed = useRef(false);

	useEffect(() => {
		return () => {
			isLongedPressed.current = false;
		};
	}, []);

	return (
		<TouchableOpacity
			style={styles.btn}
			onPressIn={() => {
				impactAsync(ImpactFeedbackStyle.Light);
				onChange(value + (type === "dec" ? -step : step));
			}}
			onPressOut={() => {
				isLongedPressed.current = false;
			}}
			delayLongPress={250}
			onLongPress={() => {
				isLongedPressed.current = true;

				let prevTime = 0;
				let timeout = 500;
				let prevValue = value;
				const handleNextStep = () => {
					const now = new Date().getTime();
					if (now - prevTime > Math.max(25, timeout)) {
						impactAsync(ImpactFeedbackStyle.Light);
						prevTime = now;
						timeout *= 0.7;
						prevValue += type === "dec" ? -step : step;
						onChange(prevValue);
					}

					if (isLongedPressed.current) {
						requestAnimationFrame(handleNextStep);
					}
				};

				requestAnimationFrame(handleNextStep);
			}}
		>
			<Feather
				name={type === "inc" ? "plus" : "minus"}
				color={THEME.bgContent}
				size={16}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	btn: {
		width: 46,
		justifyContent: "center",
		alignItems: "center",
	},
});
