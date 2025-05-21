import { View, Text, StyleSheet, Image } from 'react-native';
import { BookOpenText } from 'lucide-react-native';

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <BookOpenText size={64} color="#BBDEFB" />
      </View>
      <Text style={styles.title}>No Notes Yet</Text>
      <Text style={styles.subtitle}>
        Tap the "New Note" button to create your first daily note
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconContainer: {
    backgroundColor: '#E3F2FD',
    padding: 24,
    borderRadius: 100,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#424242',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 24,
  },
});