import { type PropsWithChildren, createContext, useContext } from "react";
import type { TextStyle } from "react-native";

export interface ITextTheme {
	color?: TextStyle["color"];
	size?: TextStyle["fontSize"];
	weight?: TextStyle["fontWeight"];
	align?: TextStyle["textAlign"];
}

type ITextThemeCtx = ITextTheme;

const TextThemeCtx = createContext<ITextThemeCtx | null>(null);

type IProps = PropsWithChildren<{ theme: ITextThemeCtx }>;

export const TextThemeCtxProvider = ({ children, theme }: IProps) => {
	return (
		<TextThemeCtx.Provider value={theme}>{children}</TextThemeCtx.Provider>
	);
};

export const useTextTheme = () => {
	const ctx = useContext(TextThemeCtx);
	if (!ctx) {
		return null;
	}
	return ctx;
};
