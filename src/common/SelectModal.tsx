import { Ionicons } from "@expo/vector-icons";
import { FontSize, THEME } from "@lib/theme";
import { useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";
import {
	Easing,
	ReduceMotion,
	runOnJS,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { UiButton } from "./UiButton";
import { InlineSelectBorderGradient } from "./UiInlineSelect/BorderGradient";
import { type IModalCommonProps, UiModal, UiModalHeader } from "./UiModal";
import { UiPressable } from "./UiPressable";
import { UiText } from "./UiText";
import { UiView } from "./UiView";

export interface ISelectOption {
	label: string;
	value: string;
}

export interface ISelectProps extends IModalCommonProps {
	options: Array<ISelectOption | string>;
	selected?: string | null;
	onChange?: (opt: ISelectOption) => void;
}

const ITEM_HEIGHT = 56;

export const SelectModal = ({
	isVisible,
	onClose,
	options = [],
	selected,
	onChange,
}: ISelectProps) => {
	const handleSelect = (opt: ISelectOption) => {
		if (onChange) {
			onChange(opt);
			onClose();
		}
	};

	const data = useMemo(() => {
		const tmp: ISelectOption[] = [];
		for (const opt of options) {
			if (typeof opt === "string") {
				tmp.push({ label: opt, value: opt });
			} else tmp.push(opt);
		}
		return tmp;
	}, [options]);

	return (
		<UiModal isVisible={isVisible} onClose={onClose}>
			<UiView position="relative" flex={1}>
				<UiModalHeader>
					<UiButton flex={1} title="Cancel" onPress={onClose} />
				</UiModalHeader>

				<UiView position="relative" flex={1}>
					<InlineSelectBorderGradient pos="top" />
					<InlineSelectBorderGradient pos="bottom" />

					<FlatList
						style={{ flex: 1, paddingVertical: 6 }}
						data={data}
						ItemSeparatorComponent={() => (
							<UiView flex={1} height={1} bgColor={THEME.primaryD1} />
						)}
						renderItem={({ item }) => (
							<UiPressable onPress={() => handleSelect(item)}>
								<UiView
									height={ITEM_HEIGHT}
									px={12}
									pointerEvents="none"
									alignItems="center"
									flexDir="row"
								>
									<UiText content={item.label} size={FontSize.xl2} flex={1} />
									{item.value === selected && (
										<Ionicons name="checkmark" color={THEME.accent} size={24} />
									)}
								</UiView>
							</UiPressable>
						)}
					/>
				</UiView>
			</UiView>
		</UiModal>
	);
};
