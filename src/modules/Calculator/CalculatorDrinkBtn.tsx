import { useCalculatorFacade } from "@common/Hooks/useCalculatorFacade";
import { useCurrentStatistics } from "@common/Hooks/useCurrentStatistics";
import { BtnKind, UiButton } from "@common/UiButton";
import { UiText } from "@common/UiText";
import { THEME } from "@lib/theme";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

// TODO: add a modal when clicked for the first time to explain
// TODO: make animation better
export const CalculatorDrinkBtn = () => {
	const animProgress = useSharedValue(0);
	const [hasPressed, setHasPressed] = useState(false);

	const { portions } = useCalculatorFacade();
	const { addDrankCoffee } = useCurrentStatistics();

	useEffect(() => {
		if (hasPressed) {
			animProgress.value = withTiming(1, {
				duration: 300,
			});

			let timeout: null | NodeJS.Timeout = setTimeout(() => {
				setHasPressed(false);
				timeout = null;
			}, 900);

			return () => {
				if (timeout != null) {
					clearTimeout(timeout);
				}
			};
		}

		animProgress.value = withTiming(0, {
			duration: 300,
		});
	}, [hasPressed, animProgress]);

	const addedAnimStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateY: `${interpolate(animProgress.value, [0, 1], [200, 0])}%` },
		],
	}));

	return (
		<UiButton
			kind={BtnKind.solid}
			mx={12}
			mt={16}
			mb={8}
			onPress={() => {
				if (hasPressed) return;
				setHasPressed(true);
				addDrankCoffee();
			}}
			overflow="hidden"
		>
			<UiText content="Drink coffee" />
			<Animated.View
				style={[styles.addedContainer, addedAnimStyle]}
				pointerEvents="none"
			>
				<UiText content={`+${portions}`} />
			</Animated.View>
		</UiButton>
	);
};

const styles = StyleSheet.create({
	addedContainer: {
		backgroundColor: THEME.primary,
		position: "absolute",
		width: "100%",
		height: "100%",
		alignItems: "center",
	},
});
