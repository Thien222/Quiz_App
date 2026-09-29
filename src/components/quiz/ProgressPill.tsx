import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function ProgressPill({ value }: { value: number }) {
  const width = `${Math.max(0, Math.min(100, value * 100))}%` as `${number}%`;
  return <View style={styles.track}><LinearGradient colors={['#F472B6', '#A78BFA']} style={[styles.fill, { width }]} /></View>;
}

const styles = StyleSheet.create({ track: { height: 10, borderRadius: 999, overflow: 'hidden', backgroundColor: '#FCE7F3' }, fill: { height: '100%', borderRadius: 999 } });
