import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, shadows } from '@/constants/theme';
import { useResponsiveLayout } from '@/utils/responsive';

type IoniconName = keyof typeof Ionicons.glyphMap;

function TabIcon({
  name,
  activeName,
  focused,
}: {
  name: IoniconName;
  activeName: IoniconName;
  focused: boolean;
}) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Ionicons
        name={focused ? activeName : name}
        size={22}
        color={focused ? colors.primaryDark : colors.textMuted}
      />
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { isTablet } = useResponsiveLayout();

  const bottomInset = insets.bottom > 0 ? insets.bottom : 8;
  const tabBarHeight = 62 + bottomInset;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: [
          styles.tabBar,
          {
            height: tabBarHeight,
            paddingBottom: bottomInset,
          },
          isTablet && styles.tabletTabBar,
        ],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarLabelPosition: 'below-icon',
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home-outline" activeName="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Khám phá',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="compass-outline" activeName="compass" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Kết quả',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="ribbon-outline" activeName="ribbon" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Cá nhân',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="person-outline" activeName="person" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingTop: 6,
    ...shadows.soft,
  },
  tabletTabBar: {
    width: '100%',
    alignSelf: 'center',
    maxWidth: 700,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabBarItem: {
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabel: {
    fontSize: 11,
    lineHeight: 16,
    minHeight: 18,
    flexShrink: 0,
    fontWeight: '700',
    marginTop: 2,
  },
  iconWrap: {
    width: 44,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: 'rgba(244, 114, 182, 0.15)',
  },
});
