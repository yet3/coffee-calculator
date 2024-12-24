import { UiSafeAreaView } from "@common/UiSafeAreaView";
import { THEME } from "@lib/theme";
import { AdsBanner } from "@modules/AdsBanner";
import { CalculatorDrinkBtn } from "@modules/Calculator/CalculatorDrinkBtn";
import { CalculatorHeader } from "@modules/Calculator/CalculatorHeader";
import { CalculatorInputs } from "@modules/Calculator/CalculatorInputs";
import { CalculatorRatioPicker } from "@modules/Calculator/CalculatorRatioPicker";
import { ConsiderSupportingLink } from "@modules/ConsiderSupportingLink";
import { ScrollView } from "react-native";

export default function QuickCalculatorScreen() {
	return (
		<UiSafeAreaView flex={1} bgColor={THEME.bg}>
			<AdsBanner />
			<ScrollView style={{ flex: 1 }}>
				<CalculatorHeader />
				<CalculatorInputs />

				<CalculatorDrinkBtn />

				{/* TODO: make better */}
				<ConsiderSupportingLink />

				<CalculatorRatioPicker />
			</ScrollView>
		</UiSafeAreaView>
	);
}
