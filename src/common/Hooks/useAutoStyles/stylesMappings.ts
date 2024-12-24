import type { ImageStyle, TextStyle, ViewStyle } from "react-native";

type IStyle = ViewStyle & TextStyle & ImageStyle;
type IStyleKeys = keyof IStyle;

type TGenerateAutoStyles<TSrc> = {
	[TKey in keyof TSrc]?: TSrc[TKey] extends IStyleKeys
		? IStyle[TSrc[TKey]]
		: "Key must be string | symbol | number";
};

const makeMappings = <T extends Record<string, IStyleKeys>>(maps: T): T => maps;

export const AUTO_STYLES_MAPPINGS = makeMappings({
	// dim
	width: "width",
	height: "height",
	minWidth: "minWidth",
	minHeight: "minHeight",
	position: "position",

  // overflow
  overflow: 'overflow',

	// border
	rounded: "borderRadius",

	// margins
	m: "margin",
	mt: "marginTop",
	mb: "marginBottom",
	my: "marginVertical",
	mr: "marginRight",
	ml: "marginLeft",
	mx: "marginHorizontal",

	// paddings
	p: "padding",
	pt: "paddingTop",
	pb: "paddingBottom",
	py: "paddingVertical",
	pr: "paddingRight",
	pl: "paddingLeft",
	px: "paddingHorizontal",

	// gap
	gap: "gap",
	xGap: "columnGap",
	yGap: "rowGap",

	// flex
	flex: "flex",
	flexDir: "flexDirection",
	flexWrap: "flexWrap",
	alignItems: "alignItems",
	justifyContent: "justifyContent",

	// general
	bgColor: "backgroundColor",

	// text
	alignText: "textAlign",
});

export type IAutoStyles = TGenerateAutoStyles<typeof AUTO_STYLES_MAPPINGS>;
