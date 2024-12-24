import { FontSize, FontWeight, THEME } from "@lib/theme";
import type { ReactNode } from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";
import { UiText } from "./UiText";
import { UiView } from "./UiView";

interface IProps extends TextInputProps {
	label?: string;
	labelIcon?: ReactNode;
}
// TODO: make sure that 3,5 works just like 3.5

export const UiInput = ({ label, labelIcon, onChange, ...props }: IProps) => {
	return (
		<UiView style={styles.container}>
			<UiView style={styles.labelContainer}>
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
			<TextInput
				placeholderTextColor={THEME.primaryL2}
				{...props}
				style={[styles.input, props.style]}
			/>
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
		marginLeft: 6,
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
