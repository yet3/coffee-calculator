import { type IAutoStyles, useAutoStyles } from "@common/Hooks/useAutoStyles";
import { FontSize, FontWeight, THEME } from "@lib/theme";
import {
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	type NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	type TextInputFocusEventData,
} from "react-native";
import { UiText } from "../UiText";
import { UiView } from "../UiView";
import { IncDecBtn } from "./IncDecBtn";

interface IProps extends IAutoStyles {
	label?: string;
	labelWidth?: number;
	labelIcon?: ReactNode;

	value: number;
	step?: number;
	onChange: (value: number) => void;

	min?: number;
	max?: number;

	onlyIntegers?: boolean;
}

const valueToString = (val: number): string => {
  return val.toString()
};

export const UiNumbersInput = ({
	label,
	labelIcon,
	value,
	onChange,
	step = 1,
	min,
	max,
	labelWidth,
	onlyIntegers,
	...props
}: IProps) => {
	const autoStyles = useAutoStyles(props);
	const [innerValue, setInnerValue] = useState(valueToString(value));
	const inputRef = useRef<TextInput | null>(null);
	const focusValue = useRef(value);

	const [isFocused, setIsFocused] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		if (inputRef.current?.isFocused && innerValue.length === 0) {
			return;
		}

		setInnerValue(valueToString(value));
	}, [value]);

	const minMaxValue = useCallback(
		(val: number): number => {
			if (min != null && val < min) {
				return min;
			}

			if (max != null && val > max) {
				return max;
			}

			return val;
		},
		[min, max],
	);

	const parseNumber = useCallback(
		(val: string): number => {
			if (onlyIntegers) {
				return Number.parseInt(val, 10);
			}
			return Number.parseFloat(val);
		},
		[onlyIntegers],
	);

	const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		const parsed = parseNumber(e.nativeEvent.text);
		if (Number.isNaN(parsed)) {
			handleChange(value, true);
			return;
		}
		handleChange(parsed, true);

		setIsFocused(false);
	};

	const handleChangeText = (text: string) => {
		setInnerValue(text);

		const parsed = parseNumber(text);
		if (Number.isNaN(parsed)) {
			onChange(focusValue.current);
			return;
		}

		if ((min == null || parsed > min) && (max == null || parsed < max)) {
			handleChange(parsed);
		}
	};

	const handleChange = (_val: number, withInner = false) => {
		const val = minMaxValue(_val);
		if (withInner) {
			setInnerValue(valueToString(val));
		}
		onChange(val);
	};

	return (
		<UiView style={[autoStyles, styles.container]}>
			<UiView style={[styles.labelContainer, { width: labelWidth }]}>
				{labelIcon}
				{label && (
					<UiText
						style={styles.label}
						weight={FontWeight.medium}
						size={FontSize.lg}
						color={THEME.bgContent}
					>
						{label}
					</UiText>
				)}
			</UiView>

			<UiView style={styles.innerContainer}>
				<IncDecBtn
					type="dec"
					step={step}
					value={value}
					onChange={(v) => handleChange(v, innerValue.length === 0)}
				/>
				<TextInput
					placeholderTextColor={THEME.primaryL1}
					{...props}
					placeholder={
						isFocused && innerValue.length === 0 ? valueToString(value) : ""
					}
					keyboardType={onlyIntegers ? "number-pad" : "decimal-pad"}
					ref={inputRef}
					onBlur={handleBlur}
					onFocus={() => {
						focusValue.current = value;
						setIsFocused(true);
					}}
					onChangeText={handleChangeText}
					value={innerValue}
					style={styles.input}
				/>
				<IncDecBtn
					type="inc"
					step={step}
					value={value}
					onChange={(v) => handleChange(v, innerValue.length === 0)}
				/>
			</UiView>
		</UiView>
	);
};

const styles = StyleSheet.create({
	container: {
		borderColor: THEME.primary,
		borderWidth: 2,
		borderRadius: THEME.rounded.xl4,
		backgroundColor: THEME.primary,
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	labelContainer: {
		marginLeft: 8,
		marginVertical: 6,
		flexDirection: "row",
		alignItems: "center",
	},
	label: {
		marginLeft: 6,
		maxWidth: 120,
	},
	innerContainer: {
		backgroundColor: THEME.primaryD1,
		flex: 1,
		flexDirection: "row",
		overflow: "hidden",
		borderRadius: THEME.rounded.xl4,
		height: "100%",
	},
	input: {
		flex: 1,
		fontSize: THEME.fontSize[FontSize.lg],
		color: THEME.bgContent,
		paddingHorizontal: 0,
		paddingVertical: 12,
		backgroundColor: THEME.primaryD1,

		textAlign: "center",
	},
});
