import { supabase } from './supabase';

export async function createUserProfile(email: string, password: string) {
  try {
    // 1. Sign up the user
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;
    if (!user) throw new Error('No user returned after signup');

    // 2. Create a profile for the user
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: email,
      });

    if (profileError) {
      // If profile creation fails, clean up by deleting the auth user
      await supabase.auth.admin.deleteUser(user.id);
      throw profileError;
    }

    return { data: { user }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}