import { BtnKind, BtnVariant, UiButton } from "@common/UiButton";
import { UiText } from "@common/UiText";
import { useCanShowAds } from "@common/Hooks/useCanShowAds";
import { RemoveAdsIcon } from "@common/Icons/RemoveAdsIcon";
import { FontSize, FontWeight, THEME } from "@lib/theme";

export const RemoveAdsOption = () => {
	const { canShowAds } = useCanShowAds();

	if (!canShowAds) return null;

	return (
		<UiButton
			variant={BtnVariant.primary}
			kind={BtnKind.solid}
			justifyContent="flex-start"
			flexDir="row"
			height={50}
		>
			<RemoveAdsIcon />
			<UiText
				ml={6}
				color={THEME.bgContent}
				content="Remove ADS"
				flex={1}
				size={FontSize.lg}
				weight={FontWeight.medium}
			/>
			<UiText
				color={THEME.bgContent}
				content="$3.99"
				size={FontSize.lg}
				weight={FontWeight.medium}
			/>
		</UiButton>
	);
};
