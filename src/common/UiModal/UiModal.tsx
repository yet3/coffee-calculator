import { SCREEN_HEIGHT } from "@lib/consts";
import { THEME } from "@lib/theme";
import { type ReactNode, useEffect, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import Animated, {
	Easing,
	ReduceMotion,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { UiPressable } from "../UiPressable";
import { UiSafeAreaView } from "../UiSafeAreaView";

export interface IModalCommonProps {
	isVisible: boolean;
	onClose: () => void;
}

interface IProps extends IModalCommonProps {
	children: ReactNode;
}

export const UiModal = ({ isVisible, onClose, children }: IProps) => {
	const animProgress = useSharedValue(0);
	const [isModalDisplayed, setIsModalDisplayed] = useState(isVisible);

	useEffect(() => {
		let goal = 0;
		if (isVisible) {
			goal = 1;
			setIsModalDisplayed(true);
		}

		animProgress.value = withTiming(
			goal,
			{
				duration: 250,
				easing: Easing.ease,
				reduceMotion: ReduceMotion.System,
			},
			() => {
				if (!isVisible) {
					runOnJS(setIsModalDisplayed)(false);
				}
			},
		);
	}, [isVisible, animProgress]);

	const backdropAnimStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(animProgress.value, [0, 1], [0, 0.9]),
		};
	});

	const modalAnimStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateY: `${interpolate(animProgress.value, [0, 1], [100, 0])}%` },
			],
		};
	});

	return (
		<Modal
			visible={isModalDisplayed}
			transparent
			animationType="none"
			style={{
				flex: 1,
				justifyContent: "flex-end",
			}}
		>
			<Animated.View
				style={[styles.backdropWrapper, backdropAnimStyle]}
				pointerEvents="box-none"
			>
				<UiPressable style={styles.backdrop} onPress={() => onClose()} />
			</Animated.View>

			<UiSafeAreaView pointerEvents="box-none" flex={1} justifyContent="flex-end">
				<Animated.View style={[styles.modal, modalAnimStyle]}>
					{children}
				</Animated.View>
			</UiSafeAreaView>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		overflow: "hidden",
		height: SCREEN_HEIGHT * 0.8,
		borderTopLeftRadius: THEME.rounded.xl2,
		borderTopRightRadius: THEME.rounded.xl2,
		backgroundColor: THEME.bg,
	},
	backdropWrapper: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
	},
	backdrop: {
		width: "100%",
		height: "100%",
		backgroundColor: THEME.black,
	},
});
