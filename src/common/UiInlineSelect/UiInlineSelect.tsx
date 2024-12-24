import { FontSize, THEME } from "@lib/theme";
import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import { useLayoutEffect, useMemo, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import { UiPressable } from "../UiPressable";
import { UiText } from "../UiText";
import { UiView } from "../UiView";
import { type IAutoStyles, useAutoStyles } from "../Hooks/useAutoStyles";
import { InlineSelectBorderGradient } from "./BorderGradient";

interface IOpt {
	name: string;
	value: string;
}

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;

interface IProps extends IAutoStyles {
	options: Array<IOpt | string>;
	selected?: string | null;
	onChange?: (opt: IOpt) => void;
}

export const UiInlineSelect = ({
	options,
	selected,
	onChange,
	...props
}: IProps) => {
	const autoStyles = useAutoStyles(props);
	const listRef = useRef<FlatList<IOpt>>(null);
	const lastIdx = useRef(0);

	const data = useMemo(() => {
		const tmp: IOpt[] = [];
		for (const opt of options) {
			if (typeof opt === "string") {
				tmp.push({ name: opt, value: opt });
			} else tmp.push(opt);
		}
		return tmp;
	}, [options]);

	const initialIdx = useMemo(() => {
		const idx = data.findIndex((d) => d.name === selected);
		return idx >= 0 ? idx : undefined;
	}, [data, selected]);

	useLayoutEffect(() => {
		const list = listRef.current;
		if (!list) return;
		const idx = data.findIndex((d) => d.name === selected);

		if (idx >= 0 && lastIdx.current !== idx) {
			list.scrollToIndex({
				animated: true,
				index: idx,
			});
		}
	}, [selected, data]);

	return (
		<UiView style={[styles.container, autoStyles]} py={12}>
			<UiView
        flex={1}
        position="relative"
				bgColor={THEME.bg}
				justifyContent="center"
			>
				<InlineSelectBorderGradient pos="top" />
				<InlineSelectBorderGradient pos="bottom" />

				<UiView
					height={ITEM_HEIGHT * VISIBLE_ITEMS}
					style={{ position: "relative" }}
				>
					<UiView style={styles.selectedLine} />

					<FlatList
						ref={listRef}
						initialScrollIndex={initialIdx}
						onScroll={(e) => {
							const idx = Math.floor(
								e.nativeEvent.contentOffset.y / ITEM_HEIGHT,
							);
							if (lastIdx.current !== idx) {
								// TODO: check feedback on mobile device
								impactAsync(ImpactFeedbackStyle.Light);
								lastIdx.current = idx;
								if (onChange && data[idx]) {
									onChange(data[idx]);
								}
							}
						}}
						snapToAlignment="center"
						snapToInterval={ITEM_HEIGHT}
						style={{
							flex: 1,
							paddingTop: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2),
						}}
						decelerationRate={0.92}
						data={data}
						getItemLayout={(_, index) => ({
							length: ITEM_HEIGHT,
							offset: ITEM_HEIGHT * index,
							index,
						})}
						renderItem={({ index, item }) => (
							<UiPressable
								mb={
									index === data.length - 1
										? ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2)
										: 0
								}
								onPress={() => {
									if (listRef.current) {
										listRef.current.scrollToIndex({
											animated: true,
											index,
										});
									}
								}}
							>
								<UiView
									height={ITEM_HEIGHT}
									justifyContent="center"
									alignItems="center"
								>
									<UiText color={THEME.bgContent} size={FontSize.xl2}>
										{item.name}
									</UiText>
								</UiView>
							</UiPressable>
						)}
					/>
				</UiView>
			</UiView>
		</UiView>
	);
};

const styles = StyleSheet.create({
	container: {},
	selectedLine: {
		position: "absolute",
		top: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2),
		left: 0,
		width: "100%",
		height: ITEM_HEIGHT,
		backgroundColor: THEME.primaryD1,
	},
});
