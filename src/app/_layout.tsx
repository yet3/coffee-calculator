import { useStorageNumber } from "@common/Hooks/useStorageNumber";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { useCanShowAds } from "@common/Hooks/useCanShowAds";
import {
	PermissionStatus,
	getTrackingPermissionsAsync,
	requestTrackingPermissionsAsync,
} from "expo-tracking-transparency";
import mobileAds, { AdsConsent } from "react-native-google-mobile-ads";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
	duration: 150,
	fade: true,
});


// TODO: add mixpanel events

export default function RootLayout() {
	const [timesOpened, setTimesOpened] = useStorageNumber("timesOpened", 0);
	const { setCanShowAds } = useCanShowAds();
	const [isFontLoaded] = useFonts({
		Lato: require("../assets/fonts/Lato-Regular.ttf"),
		LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
		LatoBlack: require("../assets/fonts/Lato-Black.ttf"),
	});

	useEffect(() => {
		if (!isFontLoaded) return;

		SplashScreen.hide();
	}, [isFontLoaded]);

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		let isMobileAdsStartCalled = false;
		const init = async () => {
			setCanShowAds(true);

			try {
				const { canRequestAds } = await AdsConsent.gatherConsent();

				if (canRequestAds) {
					await startGoogleMobileAdsSDK();
				}
			} catch (e) {
				console.error("Consent gathering failed:", e);
			}


			if (timesOpened >= 5) {
				// TODO: Open Review
			}
		};

		const startGoogleMobileAdsSDK = async () => {
			if (isMobileAdsStartCalled) return;
			isMobileAdsStartCalled = true;

			// (Optional, iOS) Handle Apple's App Tracking Transparency manually.
			const gdprApplies = await AdsConsent.getGdprApplies();
			const hasConsentForPurposeOne =
				gdprApplies && (await AdsConsent.getPurposeConsents()).startsWith("1");
			if (!gdprApplies || hasConsentForPurposeOne) {
				const { status } = await getTrackingPermissionsAsync();
				if (status === PermissionStatus.UNDETERMINED) {
					await requestTrackingPermissionsAsync();
				}
			}

			// Initialize the Google Mobile Ads SDK.
			await mobileAds().initialize();
		};

		init();
		setTimesOpened((prev) => (prev ?? 0) + 1);
	}, []);

	if (!isFontLoaded) {
		return null;
	}

	return (
		<>
			<StatusBar style="light" />
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			/>
		</>
	);
}
