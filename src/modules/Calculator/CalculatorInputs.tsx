import { BtnKind, UiButton } from "@common/UiButton";
import { UiNumbersInput } from "@common/UiNumbersInput";
import { UiView } from "@common/UiView";
import { useUnitsFacade } from "@common/Hooks/useUnitsFacade";
import { CoffeeIcon } from "@common/Icons/CoffeeIcon";
import { Ionicons } from "@expo/vector-icons";
import { DEFAULT_GROUNDS_AMT, DEFAULT_WATER_AMT } from "@lib/consts";
import {
	convertToMl,
	convertFromGrams,
	convertFromMl,
	convertToGrams,
} from "@lib/convertUnits";
import { formatUnitShorthand } from "@lib/formatUnits";
import { THEME } from "@lib/theme";
import { useCalculatorFacade } from "../../common/Hooks/useCalculatorFacade";

export const CalculatorInputs = () => {
	const {
		ratio,
		portions,
		setPortions,
		groundsAmt,
		setGroundsAmt,
		waterAmt,
		setWaterAmt,
	} = useCalculatorFacade();

	const { waterUnit, coffeeUnit } = useUnitsFacade();

	const handleReset = () => {
		setPortions(1);
		setGroundsAmt(DEFAULT_GROUNDS_AMT);
		setWaterAmt(DEFAULT_WATER_AMT);
	};

	return (
		<UiView mt={24} px={12} yGap={12}>
			<UiButton
				mr="auto"
				title="Reset"
				kind={BtnKind.solid}
				onPress={handleReset}
			/>

			<UiNumbersInput
				labelIcon={
					<Ionicons name="cafe-outline" size={22} color={THEME.white} />
				}
				labelWidth={120}
				min={1}
				label="Portions"
				value={portions}
				onChange={setPortions}
			/>

			<UiNumbersInput
				mt={12}
				labelIcon={<CoffeeIcon />}
				labelWidth={120}
				min={1}
				label={`Grounds [${formatUnitShorthand(coffeeUnit)}]`}
				value={convertFromGrams(groundsAmt * portions, coffeeUnit)}
				onChange={(_v) => {
					const v = convertToGrams(_v, coffeeUnit) / portions;

					setGroundsAmt(v);
					setWaterAmt(Number((v / ratio).toFixed(1)));
				}}
			/>
			<UiNumbersInput
				label={`Water [${formatUnitShorthand(waterUnit)}]`}
				labelIcon={<Ionicons name="water" size={20} color="lightblue" />}
				labelWidth={120}
				min={1}
				value={convertFromMl(waterAmt * portions, waterUnit)}
				onChange={(_v) => {
					const v = convertToMl(_v, waterUnit) / portions;

					setWaterAmt(v);
					setGroundsAmt(Number((v * ratio).toFixed(1)));
				}}
			/>
		</UiView>
	);
};
