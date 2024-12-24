import { useUnitsFacade } from "@common/Hooks/useUnitsFacade";
import { BtnKind, BtnVariant, UiButton } from "@common/UiButton";
import { UiSafeAreaView } from "@common/UiSafeAreaView";
import { UiText } from "@common/UiText";
import { UiView } from "@common/UiView";
import { TextThemeCtxProvider } from "@contexts/useTextTheme";
import { SCREEN_WIDTH } from "@lib/consts";
import { convertFromMl } from "@lib/convertUnits";
import { formatUnitShorthand } from "@lib/formatUnits";
import { FontSize, FontWeight, THEME } from "@lib/theme";
import { AdsBanner } from "@modules/AdsBanner";
import { statsStorage } from "@stores/index";
import type { IDrankCoffeeRecord } from "@typings/stats.types";
import { WaterUnit } from "@typings/units.types";
import {
	isSameDay as isSameDayFn,
	isSameMonth as isSameMonthFn,
	isSameWeek as isSameWeekFn,
	isSameYear as isSameYearFn,
	startOfDay as startOfDayFn,
	startOfMonth as startOfMonthFn,
	startOfWeek as startOfWeekFn,
	startOfYear as startOfYearFn,
} from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { Alert, ScrollView } from "react-native";

interface ITileProps {
	when: "today" | "week" | "month" | "year" | "next-year";
	stats: null | IPerStats;
}

// TODO: add a blinking skeleton when loading stats
// TODO: add a graph of coffee drank
// TODO: add median/average time of the day when you drink coffee,
// TODO: show on which day you drink the most coffee??
// TODO: show which month you drank the most coffee
// TODO: show which year you drank the most coffee
// TODO: add option to share your stats?

const formatTileValue = (val: number | null, unit: WaterUnit): string => {
	if (val == null) return "No data";

	if (unit === WaterUnit.ml && val >= 1000) {
		return `${convertFromMl(val, WaterUnit.l)}l`;
	}
	return `${convertFromMl(val, unit)} ${formatUnitShorthand(unit)}`;
};

const Tile = ({ when, stats }: ITileProps) => {
	const { waterUnit } = useUnitsFacade();

	const [title, value, avgValue] = useMemo(() => {
		let tmpTitle = "";
		let tmpValue: number | null = null;
		let tmpAvgValue: number | null = null;

		switch (when) {
			case "today":
				tmpTitle = "Today";
				break;
			case "week":
				tmpTitle = "All Week";
				break;
			case "month":
				tmpTitle = "All Month";
				break;
			case "year":
				tmpTitle = "All Year";
				break;
		}

		if (stats) {
			const nowTimestamp = new Date().getTime();
			let accValue = 0;
			for (const [timestamp, records] of stats) {
				const calcStuff = (func: (ts: number, now: number) => boolean) => {
					for (const record of records) {
						const val = record.water * record.portions;
						accValue += val;

						if (func(timestamp, nowTimestamp)) {
							tmpValue = (tmpValue ?? 0) + val;
						}
					}
				};

				switch (when) {
					case "today":
						calcStuff(isSameDayFn);
						break;
					case "week":
						calcStuff(isSameWeekFn);
						break;
					case "month":
						calcStuff(isSameMonthFn);
						break;
					case "year":
						calcStuff(isSameYearFn);
						break;
				}
			}

			if (stats.size > 0) {
				tmpAvgValue = accValue / stats.size;
			} else tmpValue = null;
		}

		return [tmpTitle, tmpValue, tmpAvgValue];
	}, [when, stats]);

	return (
		<UiView
			bgColor={THEME.primary}
			width={SCREEN_WIDTH / 2 - 18}
			height={94}
			p={8}
			justifyContent="space-between"
			rounded={THEME.rounded.xl2}
		>
			<UiView>
				<UiText content={title} size={FontSize.xl} weight={FontWeight.medium} />
				<UiText
					content={stats == null ? "..." : formatTileValue(value, waterUnit)}
				/>
			</UiView>

			<UiView>
				<UiText
					content="On average"
					size={FontSize.lg}
					weight={FontWeight.medium}
				/>
				<UiText
					content={
						stats == null ? "..." : `${formatTileValue(avgValue, waterUnit)}`
					}
				/>
			</UiView>
		</UiView>
	);
};

type IPerStats = Map<number, IDrankCoffeeRecord[]>;

export default function StatisticsScreen() {
	const [perDayStats, setPerDayStats] = useState<IPerStats | null>(null);
	const [perWeekStats, setPerWeekStats] = useState<IPerStats | null>(null);
	const [perMonthStats, setPerMonthStats] = useState<IPerStats | null>(null);
	const [perYearStats, setPerYearStats] = useState<IPerStats | null>(null);

	useEffect(() => {
		const readStats = (key: string) => {
			const jsonStr = statsStorage.getString(key) ?? "[]";

			try {
				const json = JSON.parse(jsonStr) as IDrankCoffeeRecord[];

				const perDay: IPerStats = new Map();
				const perWeek: IPerStats = new Map();
				const perMonth: IPerStats = new Map();
				const perYear: IPerStats = new Map();

				const handlerPer = (
					map: IPerStats,
					func: (date: number) => Date,
					record: IDrankCoffeeRecord,
				) => {
					const timestamp = func(record.timestamp).getTime();

					if (map.has(timestamp)) {
						map.get(timestamp)?.push(record);
					} else map.set(timestamp, [record]);
				};

				for (const record of json) {
					handlerPer(perDay, startOfDayFn, record);
					handlerPer(perWeek, startOfWeekFn, record);
					handlerPer(perMonth, startOfMonthFn, record);
					handlerPer(perYear, startOfYearFn, record);
				}

				setPerDayStats(perDay);
				setPerWeekStats(perWeek);
				setPerMonthStats(perMonth);
				setPerYearStats(perYear);
			} catch (e) {
				console.log(e);
			}
		};

		statsStorage.addOnValueChangedListener((key) => {
			if (key.startsWith("drank_coffee_")) {
				readStats(key);
			}
		});

		readStats(`drank_coffee_${new Date().getFullYear()}`);
		for (const key of statsStorage.getAllKeys()) {
			readStats(key);
		}
	}, []);

	return (
		<UiSafeAreaView flex={1} bgColor={THEME.bg}>
			<AdsBanner />
			<ScrollView
				style={{
					paddingTop: 16,
					paddingHorizontal: 12,
				}}
			>
				<UiButton
					mb={16}
					title="Reset statistics"
					onPress={() => {
						// TODO: make a proper reset button
						Alert.alert(
							"Reset statistics",
							"Are you sure you want to reset your statistics?",
							[
								{
									text: "Cancel",
									style: "cancel",
								},
								{
									text: "Yes",
									onPress: () => {
										statsStorage.clearAll();
									},
								},
							],
						);
					}}
					variant={BtnVariant.danger}
					kind={BtnKind.solid}
				/>

				<UiText
					size={FontSize.xl4}
					weight={FontWeight.normal}
					color={THEME.bgContent}
				>
					You made ☕
				</UiText>

				<UiView flexDir="row" flexWrap="wrap" mt={8} gap={12}>
					<TextThemeCtxProvider theme={{ color: THEME.bgContent }}>
						<Tile when="today" stats={perDayStats} />
						<Tile when="week" stats={perWeekStats} />
						<Tile when="month" stats={perMonthStats} />
						<Tile when="year" stats={perYearStats} />
					</TextThemeCtxProvider>
				</UiView>
			</ScrollView>
		</UiSafeAreaView>
	);
}
