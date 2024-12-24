import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { THEME } from "@lib/theme";
import { Tabs } from "expo-router";

export default () => {
	return (
		<Tabs
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: THEME.bg,
					paddingTop: 0,
					marginTop: 0,
					borderTopWidth: 0,
					height: 65,
				},
				tabBarIcon: ({ size, focused }) => {
					const color: string = focused ? THEME.accent : THEME.primaryL1;

					switch (route.name) {
						case "settings":
							return (
								<SimpleLineIcons name="settings" size={size} color={color} />
							);
						case "statistics":
							return (
								<SimpleLineIcons name="chart" size={size} color={color} />
							);
					}

					return (
						<SimpleLineIcons name="calculator" size={size} color={color} />
					);
				},
			})}
		>
			<Tabs.Screen name="statistics" />
			<Tabs.Screen name="index" />
			<Tabs.Screen name="settings" />
		</Tabs>
	);
};
