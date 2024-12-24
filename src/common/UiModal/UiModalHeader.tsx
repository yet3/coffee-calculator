import { UiView } from "@common/UiView";
import { THEME } from "@lib/theme";
import type { ReactNode } from "react";
import { StyleSheet } from "react-native";

interface IProps {
	children: ReactNode;
}

export const UiModalHeader = ({ children }: IProps) => {
	return <UiView style={styles.container}>{children}</UiView>;
};

const styles = StyleSheet.create({
	container: {
		minHeight: 50,
		backgroundColor: THEME.primary,
		flexDirection: "row",
		borderBottomColor: THEME.primaryL1,
		borderBottomWidth: 1,
	},
});
