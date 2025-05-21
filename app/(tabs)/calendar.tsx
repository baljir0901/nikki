import { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar as RNCalendar, DateData } from 'react-native-calendars';
import { router } from 'expo-router';
import { loadNotes } from '@/utils/storage';
import { Note } from '@/utils/types';
import Header from '@/components/Header';
import NoteCard from '@/components/NoteCard';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  
  // Load notes and mark dates with notes
  const loadMarkedDates = useCallback(async () => {
    const notes = await loadNotes();
    const marked = notes.reduce((acc, note) => {
      acc[note.date] = {
        marked: true,
        dotColor: '#2196F3'
      };
      return acc;
    }, {});
    
    setMarkedDates(marked);
  }, []);

  useEffect(() => {
    loadMarkedDates();
  }, [loadMarkedDates]);

  // Find note for selected date
  const findNoteForDate = useCallback(async (date: string) => {
    const notes = await loadNotes();
    const note = notes.find(n => n.date === date);
    setSelectedNote(note || null);
  }, []);

  const handleDayPress = (day: DateData) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);
    findNoteForDate(dateString);
  };

  const handleAddNote = () => {
    if (selectedDate) {
      router.push({
        pathname: '/note/new',
        params: { date: selectedDate }
      });
    }
  };

  const handleNotePress = (noteId: string) => {
    router.push(`/note/${noteId}`);
  };

  return (
    <View style={styles.container}>
      <Header title="Calendar" />
      
      <RNCalendar
        style={styles.calendar}
        theme={{
          backgroundColor: '#FFFFFF',
          calendarBackground: '#FFFFFF',
          textSectionTitleColor: '#212121',
          selectedDayBackgroundColor: '#2196F3',
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: '#2196F3',
          dayTextColor: '#424242',
          textDisabledColor: '#9E9E9E',
          dotColor: '#2196F3',
          selectedDotColor: '#FFFFFF',
          arrowColor: '#2196F3',
          monthTextColor: '#212121',
          textDayFontFamily: 'Inter-Regular',
          textMonthFontFamily: 'Inter-SemiBold',
          textDayHeaderFontFamily: 'Inter-Medium',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 12
        }}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            ...(markedDates[selectedDate] || {}),
            selected: true
          }
        }}
        onDayPress={handleDayPress}
        enableSwipeMonths={true}
      />
      
      <View style={styles.content}>
        {selectedNote ? (
          <TouchableOpacity 
            onPress={() => handleNotePress(selectedNote.id)}
          >
            <NoteCard note={selectedNote} />
          </TouchableOpacity>
        ) : selectedDate && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddNote}
          >
            <View style={styles.addButtonInner}>
              <Text style={styles.addButtonText}>Add Note for {formatDate(new Date(selectedDate))}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
  },
  calendar: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addButtonInner: {
    padding: 16,
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 12,
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#2196F3',
  },
});