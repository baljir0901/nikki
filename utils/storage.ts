import { supabase } from './supabase';
import { Note } from './types';

// Load all notes
export async function loadNotes(): Promise<Note[]> {
  try {
    const { data: notes, error } = await supabase
      .from('notes')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    
    return notes || [];
  } catch (error) {
    console.error('Error loading notes:', error);
    return [];
  }
}

// Load a single note by ID
export async function loadNote(id: string): Promise<Note | null> {
  try {
    const { data: note, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    
    return note;
  } catch (error) {
    console.error('Error loading note:', error);
    return null;
  }
}

// Save a note (create or update)
export async function saveNote(note: Note): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const noteData = {
      ...note,
      user_id: user.id,
    };

    if (note.id) {
      // Update
      const { error } = await supabase
        .from('notes')
        .update(noteData)
        .eq('id', note.id);

      if (error) throw error;
    } else {
      // Insert
      const { error } = await supabase
        .from('notes')
        .insert(noteData);

      if (error) throw error;
    }
  } catch (error) {
    console.error('Error saving note:', error);
    throw error;
  }
}

// Delete a note
export async function deleteNote(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
}

// Clear all notes
export async function clearAllNotes(): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('user_id', user.id);
  } catch (error) {
    console.error('Error clearing notes:', error);
    throw error;
  }
}