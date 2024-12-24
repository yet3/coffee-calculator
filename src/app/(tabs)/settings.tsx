import type { ISelectOption } from "@common/SelectModal";
import { UiSafeAreaView } from "@common/UiSafeAreaView";
import { UiSelect } from "@common/UiSelect";
import { UiText } from "@common/UiText";
import { UiView } from "@common/UiView";
import { useUnitsFacade } from "@common/Hooks/useUnitsFacade";
import { CoffeeIcon } from "@common/Icons/CoffeeIcon";
import { Ionicons } from "@expo/vector-icons";
import { formatUnitFull } from "@lib/formatUnits";
import { FontSize, FontWeight, THEME } from "@lib/theme";
import { AdsBanner } from "@modules/AdsBanner";
import { RemoveAdsOption } from "@modules/Settings/RemoveAdsOption";
import { CoffeeUnit, WaterUnit } from "@typings/units.types";
import { ScrollView } from "react-native";

// TODO: add more interesting units
const COFFEE_OPTIONS: ISelectOption[] = Object.values(CoffeeUnit)
	.map((unit) => ({
		label: formatUnitFull(unit),
		value: unit,
	}))
	.sort((a, b) => a.label.localeCompare(b.label));

const WATER_OPTIONS: ISelectOption[] = Object.values(WaterUnit)
	.map((unit) => ({
		label: formatUnitFull(unit),
		value: unit,
	}))
	.sort((a, b) => a.label.localeCompare(b.label));

export default function SettingsScreen() {
	const { waterUnit, setWaterUnit, coffeeUnit, setCoffeeUnit } =
		useUnitsFacade();

	return (
		<UiSafeAreaView flex={1} bgColor={THEME.bg}>
			<AdsBanner />
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: 12,
				}}
			>
				<UiText
					my={12}
					content="Settings"
					weight={FontWeight.medium}
					size={FontSize.xl4}
					color={THEME.bgContent}
				/>

				<UiView yGap={12}>
					<UiSelect
						options={COFFEE_OPTIONS}
						labelIcon={<CoffeeIcon />}
						label="Coffee unit"
						labelWidth={120}
						selected={coffeeUnit}
						onChange={(opt) => setCoffeeUnit(opt.value)}
					/>
					<UiSelect
						options={WATER_OPTIONS}
						labelIcon={<Ionicons name="water" size={20} color="lightblue" />}
						label="Water unit"
						labelWidth={120}
						selected={waterUnit}
						onChange={(opt) => setWaterUnit(opt.value)}
					/>
					<RemoveAdsOption />
				</UiView>
			</ScrollView>
		</UiSafeAreaView>
	);
}
