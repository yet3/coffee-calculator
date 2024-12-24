import { UiBadge } from "@common/UiBadge";
import { UiText } from "@common/UiText";
import { UiView } from "@common/UiView";
import { DEFAULT_WATER_AMT, RATIOS } from "@lib/consts";
import { FontSize, FontWeight, THEME } from "@lib/theme";
import type { IRatio } from "@typings/calculator.types";
import { useCalculatorFacade } from "../../common/Hooks/useCalculatorFacade";
import { CalculatorCustomRatio } from "./CalculatorCustomRatio";

export const CalculatorRatioPicker = () => {
	const { ratio, selectedRatioName, setSelectedRatioName, setWaterAmt } =
		useCalculatorFacade();

	const handleChangeRatio = ({ name, ratio: newRatio }: IRatio) => {
		setSelectedRatioName(name);
		setWaterAmt((prev) => {
			let cur = DEFAULT_WATER_AMT;
			if (prev != null) cur = prev * ratio;
			return Number((cur / newRatio).toFixed(1));
		});
	};

	return (
		<>
			<UiView
				flexDir="row"
				mt={8}
				mb={18}
				px={12}
				xGap={12}
				alignItems="center"
			>
				<UiView
					flex={1}
					height={2}
					bgColor={THEME.primaryL2}
					rounded={THEME.rounded.xl4}
				/>
				<UiText
					content="Coffee/Water Ratio"
					color={THEME.primaryL2}
					size={FontSize.xl}
					weight={FontWeight.medium}
				/>
				<UiView
					flex={1}
					height={2}
					bgColor={THEME.primaryL2}
					rounded={THEME.rounded.xl4}
				/>
			</UiView>

			<UiView
				flexDir="row"
				flexWrap="wrap"
				gap={16}
				justifyContent="center"
				px={12}
			>
				{RATIOS.map((ratio) => (
					<UiBadge
						key={ratio.name}
						label={ratio.name}
						style={{ minWidth: 80, flex: 1 }}
						onPress={() => handleChangeRatio(ratio)}
						isSelected={selectedRatioName === ratio.name}
					/>
				))}

				<CalculatorCustomRatio onChangeRatio={handleChangeRatio} />
			</UiView>
		</>
	);
};
