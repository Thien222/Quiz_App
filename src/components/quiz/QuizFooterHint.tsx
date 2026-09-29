import { StyleSheet, Text, View } from 'react-native';

interface Props {
  text?: string;
}

export function QuizFooterHint({
  text = 'Câu trả lời của bạn giúp app hiểu cách bạn thỏa hiệp và quan tâm trong tình yêu 💗',
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>💡</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: '#FFEBF3',
    borderWidth: 1,
    borderColor: '#FCDDEC',
    marginVertical: 8,
  },
  icon: {
    fontSize: 16,
  },
  text: {
    flex: 1,
    color: '#8A597F',
    fontSize: 11.5,
    lineHeight: 16,
    fontWeight: '600',
  },
});
