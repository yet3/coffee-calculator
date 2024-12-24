import { UiText } from "@common/UiText";
import { UiView } from "@common/UiView";
import { useCanShowAds } from "@common/Hooks/useCanShowAds";
import { FontSize, THEME } from "@lib/theme";
import { useState } from "react";
import {
	BannerAd,
	BannerAdSize,
	TestIds,
} from "react-native-google-mobile-ads";

export const AdsBanner = () => {
	const { canShowAds } = useCanShowAds();
	const [text, setText] = useState("Loading ads...");

	if (!canShowAds) return null;

	return (
		<UiView
			bgColor={"gray"}
			justifyContent="center"
			alignItems="center"
			minHeight={60}
			position="relative"
		>
			<UiView
				justifyContent="center"
				alignItems="center"
				style={{
					position: "absolute",
					width: "100%",
					height: "100%",
					top: 0,
					left: 0,
				}}
			>
				<UiText
					content={text}
					color={THEME.bgContent}
					size={FontSize.xl2}
					style={{}}
				/>
			</UiView>
			<BannerAd
				onAdLoaded={() => {
					setText("AD");
				}}
				onAdFailedToLoad={() => {
					setText("Failed to load an ad");
				}}
				unitId={TestIds.BANNER}
				size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
			/>
		</UiView>
	);
};
