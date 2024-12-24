import { UiText } from "@common/UiText";
import { UiView } from "@common/UiView";
import { FontSize, FontWeight, THEME } from "@lib/theme";

export const CalculatorHeader = () => {
	return (
		<UiView flexDir="column" px={8} pt={6} alignItems="center" justifyContent="space-between">
			<UiText
				content="☕ Coffee Calculator"
				weight={FontWeight.medium}
				size={FontSize.xl4}
				color={THEME.bgContent}
			/>
		</UiView>
	);
};
