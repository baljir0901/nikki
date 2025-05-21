import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link, router } from 'expo-router';
import { CirclePlus as PlusCircle } from 'lucide-react-native';
import NoteCard from '@/components/NoteCard';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import { loadNotes } from '@/utils/storage';
import { Note } from '@/utils/types';

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const storedNotes = await loadNotes();
        setNotes(storedNotes);
      } catch (error) {
        console.error('Failed to load notes:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNotes();
  }, []);

  const renderItem = ({ item }: { item: Note }) => (
    <Link href={`/note/${item.id}`} asChild>
      <TouchableOpacity>
        <NoteCard note={item} />
      </TouchableOpacity>
    </Link>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading your notes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Daily Notes" />
      
      {notes.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/note/new')}
      >
        <PlusCircle size={24} color="#FFFFFF" />
        <Text style={styles.fabText}>New Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },
  list: {
    padding: 16,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F8FA',
  },
  loadingText: {
    marginTop: 12,
    fontFamily: 'Inter-Regular',
    color: '#757575',
  },
});