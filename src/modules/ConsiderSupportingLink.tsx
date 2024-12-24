import { UiPressable } from "@common/UiPressable";
import { UiText } from "@common/UiText";
import { useCanShowAds } from "@common/Hooks/useCanShowAds";
import { FontSize, THEME } from "@lib/theme";
import { useRouter } from "expo-router";

export const ConsiderSupportingLink = () => {
	const router = useRouter();
	const { canShowAds } = useCanShowAds();

	if (!canShowAds) {
		return (
			<UiText
				color={THEME.bgContent}
				size={FontSize.lg}
				content="Thank you for supporting the app :)"
				alignText="center"
			/>
		);
	}

	return (
		<UiPressable
			onPress={() => {
				router.navigate("/settings");
			}}
			flexDir="row"
			justifyContent="center"
			alignItems="center"
		>
			<UiText
				color={THEME.bgContent}
				size={FontSize.lg}
				content="Like the app?"
				alignText="center"
				mr={4}
			/>

			<UiText
				color={THEME.bgContent}
				size={FontSize.lg}
				content="Consider removing ads"
				alignText="center"
				style={{
					textDecorationLine: "underline",
				}}
			/>
		</UiPressable>
	);
};
