import { StyleSheet, Text, View } from 'react-native';

export function FloatingDecorations() {
  return (
    <View aria-hidden pointerEvents="none" style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]}>
      <Text style={[styles.symbol, styles.one]}>✦</Text>
      <Text style={[styles.symbol, styles.two]}>♡</Text>
      <Text style={[styles.symbol, styles.three]}>✧</Text>
      <View style={[styles.orb, styles.orbOne]} />
      <View style={[styles.orb, styles.orbTwo]} />
    </View>
  );
}

const styles = StyleSheet.create({
  symbol: { position: 'absolute', color: '#F472B6', opacity: 0.6, fontSize: 25 },
  one: { top: '11%', left: '10%' }, two: { top: '25%', right: '9%', fontSize: 32 }, three: { bottom: '18%', left: '14%' },
  orb: { position: 'absolute', borderRadius: 999, opacity: 0.28 },
  orbOne: { width: 170, height: 170, backgroundColor: '#FFE4ED', top: -65, right: -55 },
  orbTwo: { width: 130, height: 130, backgroundColor: '#EDE9FE', bottom: 30, left: -70 },
});
