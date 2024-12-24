import { useMemo } from "react";
import type { StyleSheet } from "react-native";

type ICallback<TReturn> = () => TReturn;

// biome-ignore lint lint/suspicious/noExplicitAny:
export const useStyleSheet = <TReturn extends StyleSheet.NamedStyles<any>>(
	callback: ICallback<TReturn>,
	deps: Array<unknown> = [],
) => {
	// biome-ignore lint lint/correctness/useExhaustiveDependencies:
	return useMemo(() => {
		return callback();
	}, [...deps]);
};
