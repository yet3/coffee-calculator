import { UiBadge } from "@common/UiBadge";
import { UiButton } from "@common/UiButton";
import { UiModal, UiModalHeader } from "@common/UiModal";
import { UiNumbersInput } from "@common/UiNumbersInput";
import { UiText } from "@common/UiText";
import { UiView } from "@common/UiView";
import { useCalculatorFacade } from "@common/Hooks/useCalculatorFacade";
import { CoffeeIcon } from "@common/Icons/CoffeeIcon";
import { Feather, Ionicons } from "@expo/vector-icons";
import { FontSize, FontWeight, THEME } from "@lib/theme";
import type { IRatio } from "@typings/calculator.types";
import { useState } from "react";

interface IProps {
	onChangeRatio: (data: IRatio) => void;
}

export const CalculatorCustomRatio = ({ onChangeRatio }: IProps) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const { selectedRatioName, setCustomRatio, customRatioValues } =
		useCalculatorFacade();

	const [groundsAmt, setGroundsAmt] = useState(customRatioValues[0]);
	const [waterAmt, setWaterAmt] = useState(customRatioValues[1]);

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleSelect = () => {
		setCustomRatio(`${groundsAmt}:${waterAmt}`);
		onChangeRatio({ name: "custom", ratio: groundsAmt / waterAmt });
		setIsModalVisible(false);
	};

	const isSelected = selectedRatioName === "custom";
	return (
		<>
			<UiBadge
				onPress={() => setIsModalVisible(true)}
				isSelected={isSelected}
				icon={
					<Feather
						name="tool"
						size={16}
						color={isSelected ? THEME.bgContent : THEME.accent}
					/>
				}
				label={
					isSelected
						? `${customRatioValues[0]}:${customRatioValues[1]}`
						: "Custom"
				}
			/>
			<UiModal isVisible={isModalVisible} onClose={handleCancel}>
				<UiModalHeader>
					<UiButton flex={1} title="Cancel" onPress={handleCancel} />
					<UiButton flex={1} title="Select" onPress={handleSelect} />
				</UiModalHeader>

				<UiView mt={16} px={12}>
					<UiText
						mb={24}
						alignText="center"
						content="Grounds/Water ratio"
						weight={FontWeight.medium}
						size={FontSize.xl3}
					/>
					<UiNumbersInput
						labelIcon={<CoffeeIcon />}
						labelWidth={100}
						min={1}
						label="Grounds"
						value={groundsAmt}
						onChange={setGroundsAmt}
					/>
					<UiText
						my={12}
						content="to"
						color={THEME.primaryL2}
						weight={FontWeight.medium}
						size={FontSize.xl2}
						alignText="center"
					/>
					<UiNumbersInput
						label="Water"
						labelIcon={<Ionicons name="water" size={20} color="lightblue" />}
						labelWidth={100}
						min={1}
						value={waterAmt}
						onChange={setWaterAmt}
					/>
				</UiView>
			</UiModal>
		</>
	);
};
