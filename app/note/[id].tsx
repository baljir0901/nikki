import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Save, Trash2 } from 'lucide-react-native';
import { saveNote, loadNote, deleteNote } from '@/utils/storage';
import { Note } from '@/utils/types';
import { formatDate } from '@/utils/helpers';

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isNewNote = id === 'new';
  
  const [loading, setLoading] = useState(!isNewNote);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState<Partial<Note>>({
    title: '',
    content: '',
  });

  useEffect(() => {
    async function fetchNote() {
      if (isNewNote) return;
      
      try {
        const fetchedNote = await loadNote(id);
        if (fetchedNote) {
          setNote(fetchedNote);
        } else {
          // Note not found, redirect to home
          router.replace('/');
        }
      } catch (error) {
        console.error('Failed to load note:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNote();
  }, [id, isNewNote]);

  const handleSave = async () => {
    if (!note.title && !note.content) {
      // Don't save empty notes
      router.back();
      return;
    }
    
    setSaving(true);
    
    try {
      const timestamp = new Date().toISOString();
      const updatedNote: Note = {
        id: isNewNote ? undefined : id,
        title: note.title || 'Untitled Note',
        content: note.content || '',
        date: new Date().toISOString().split('T')[0],
        created_at: isNewNote ? timestamp : (note.created_at || timestamp),
        updated_at: timestamp,
      } as Note;
      
      await saveNote(updatedNote);
      router.back();
    } catch (error) {
      console.error('Failed to save note:', error);
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (isNewNote) {
      router.back();
      return;
    }
    
    try {
      await deleteNote(id);
      router.back();
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading your note...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#424242" />
        </TouchableOpacity>
        
        <Text style={styles.dateText}>
          {isNewNote ? formatDate(new Date()) : formatDate(new Date(note.date || ''))}
        </Text>
        
        <View style={styles.headerActions}>
          {!isNewNote && (
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={handleDelete}
            >
              <Trash2 size={22} color="#F44336" />
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Save size={20} color="#FFFFFF" />
                <Text style={styles.saveButtonText}>Save</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          placeholderTextColor="#9E9E9E"
          value={note.title}
          onChangeText={(text) => setNote({ ...note, title: text })}
          autoFocus={isNewNote}
        />
        
        <TextInput
          style={styles.contentInput}
          placeholder="Write your thoughts here..."
          placeholderTextColor="#9E9E9E"
          value={note.content}
          onChangeText={(text) => setNote({ ...note, content: text })}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  dateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#2196F3',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 8,
    marginRight: 8,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  saveButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 22,
    color: '#212121',
    marginBottom: 16,
    padding: 0,
  },
  contentInput: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#424242',
    lineHeight: 24,
    flex: 1,
    height: 400,
    padding: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 12,
    fontFamily: 'Inter-Regular',
    color: '#757575',
  },
});