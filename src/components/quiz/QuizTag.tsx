import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

interface Props {
  tag: string;
}

export function QuizTag({ tag }: Props) {
  return (
    <View style={styles.pill}>
      <Text style={styles.tagText}>{tag.startsWith('💗') ? tag : `💗 ${tag}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#FFE4F0',
    borderWidth: 1,
    borderColor: '#FCDDEC',
  },
  tagText: {
    color: '#D81B60',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
