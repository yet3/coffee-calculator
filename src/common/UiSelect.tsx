import { Ionicons } from "@expo/vector-icons";
import { FontSize, FontWeight, THEME } from "@lib/theme";
import { type ReactNode, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { type ISelectProps, SelectModal } from "./SelectModal";
import { UiPressable } from "./UiPressable";
import { UiText } from "./UiText";
import { UiView } from "./UiView";

interface IProps {
	label: string;
	labelIcon?: ReactNode;
	labelWidth?: number;

	options: ISelectProps["options"];
	selected?: ISelectProps["selected"];
	onChange?: ISelectProps["onChange"];
}

export const UiSelect = ({
	label,
	labelIcon,
	labelWidth,
	options,
	selected,
	onChange,
}: IProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const selectedLabel = useMemo(() => {
		for (const opt of options) {
			if (typeof opt === "string") {
				if (opt === selected) return opt;
			} else {
				if (opt.value === selected) {
					return opt.label;
				}
			}
		}

		return "";
	}, [options, selected]);

	return (
		<UiView>
			<SelectModal
				isVisible={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				options={options}
				selected={selected}
				onChange={onChange}
			/>
			<UiPressable
				style={styles.container}
				onPress={() => {
					setIsModalOpen(true);
				}}
			>
				<UiView style={[styles.labelContainer, { width: labelWidth }]}>
					{labelIcon}
					{label && (
						<UiText
							style={styles.label}
							weight={FontWeight.medium}
							size={FontSize.lg}
							color={THEME.bgContent}
						>
							{label}
						</UiText>
					)}
				</UiView>
				<UiView style={styles.input} flexDir="row" alignItems="center">
					<UiView flex={1} mr={8}>
						<UiText
							alignText="right"
							size={FontSize.lg}
							color={THEME.bgContent}
						>
							{selectedLabel}
						</UiText>
					</UiView>
					<Ionicons name="arrow-down" size={16} color={THEME.primaryL2} />
				</UiView>
			</UiPressable>
		</UiView>
	);
};

const styles = StyleSheet.create({
	container: {
		overflow: "hidden",
		borderColor: THEME.primary,
		backgroundColor: THEME.primary,
		borderWidth: 2,
		borderRadius: THEME.rounded.xl4,
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	labelContainer: {
		marginLeft: 8,
		marginVertical: 6,
		flexDirection: "row",
		alignItems: "center",
	},
	label: {
		marginLeft: 6,
		maxWidth: 120,
	},
	input: {
		flex: 1,
		fontSize: THEME.fontSize[FontSize.lg],
		color: THEME.bgContent,
		paddingHorizontal: 14,
		paddingVertical: 12,
		backgroundColor: THEME.primaryD1,
		textAlign: "right",
		borderTopLeftRadius: THEME.rounded.xl4,
		borderBottomLeftRadius: THEME.rounded.xl4,
	},
});
