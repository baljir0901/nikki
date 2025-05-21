import { View, Text, StyleSheet } from 'react-native';
import { Note } from '@/utils/types';
import { formatDate } from '@/utils/helpers';

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  // Function to extract a preview from content
  const getContentPreview = (content: string) => {
    if (!content) return '';
    return content.length > 100 
      ? `${content.substring(0, 100).trim()}...` 
      : content;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.date}>
          {formatDate(new Date(note.created_at))}
        </Text>
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {note.title}
      </Text>
      <Text style={styles.preview} numberOfLines={3}>
        {getContentPreview(note.content)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#2196F3',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#212121',
    marginBottom: 8,
  },
  preview: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
});