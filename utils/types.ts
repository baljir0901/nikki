export type Note = {
  id: string; // UUID from Supabase
  user_id: string; // UUID of the user who created the note
  title: string;
  content: string;
  date: string;
  created_at: string;
  updated_at: string;
};