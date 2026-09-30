import type { ReactNode } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '@/constants/theme';

interface Props {
  visible: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  actions?: ReactNode;
}

export function AppDialog({ visible, title, children, onClose, actions }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <SafeAreaView style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessible={false} />
        <View accessibilityViewIsModal aria-modal role="dialog" aria-label={title} style={styles.card}>
          <View style={styles.header}>
            <Text accessibilityRole="header" style={styles.title}>{title}</Text>
            <Pressable accessibilityRole="button" accessibilityLabel="Đóng" onPress={onClose} style={styles.close}>
              <Ionicons name="close" size={22} color={colors.text} />
            </Pressable>
          </View>
          <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>{children}</ScrollView>
          {actions ? <View style={styles.actions}>{actions}</View> : null}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', padding: spacing.lg, backgroundColor: 'rgba(40, 18, 55, 0.42)' },
  card: { width: '100%', maxWidth: 480, maxHeight: '85%', alignSelf: 'center', borderRadius: radius.hero, backgroundColor: colors.surface, padding: spacing.lg },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  title: { ...typography.cardTitle, flex: 1 },
  close: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
  body: { flexShrink: 1 },
  bodyContent: { paddingVertical: spacing.md },
  actions: { gap: spacing.xs, paddingTop: spacing.xs },
});
