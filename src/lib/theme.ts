export enum FontSize {
	xl5 = "xl5",
	xl4 = "xl4",
	xl3 = "xl3",
	xl2 = "xl2",
	xl = "xl",
	lg = "lg",
	md = "md",
	sm = "sm",
	xs = "xs",
}

export enum FontWeight {
	bold = "bold",
	medium = "medium",
	normal = "normal",
}

export const THEME = {
	white: "#ffffff",
	black: "#000000",

	bg: "#191515",
	bgContent: "#F4F2F2",

	primary: "#3E3332",
	primaryL1: "#473a39",
	primaryL2: "#564746",
	primaryD1: "#2d2625",

	accent: "#E18F8F",

  secondary: "#e1bc5b",

  danger: "#e22f3b",

	rounded: {
		sm: 2,
		md: 4,
		lg: 6,
		xl: 8,
		xl2: 12,
		xl3: 16,
		xl4: 20,
	},
	fontSize: {
		[FontSize.xl5]: 36,
		[FontSize.xl4]: 30,
		[FontSize.xl3]: 24,
		[FontSize.xl2]: 20,
		[FontSize.xl]: 18,
		[FontSize.lg]: 16,
		[FontSize.md]: 14,
		[FontSize.sm]: 12,
		[FontSize.xs]: 10,
	},
};

export type ITheme = typeof THEME;
