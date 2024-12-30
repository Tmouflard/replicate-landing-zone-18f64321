import { createClient } from '@supabase/supabase-js';

// Création du client Supabase avec les clés publiques
export const supabase = createClient(
  'https://ykxoqvzwqvjlvvbxjwdw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlreG9xdnp3cXZqbHZ2Ynhqd2R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4OTcyMzgsImV4cCI6MjAyNTQ3MzIzOH0.Yx0YEoCXUOLnXKL7OnZGGrZVGWXB_epGqHF8FGtKVxw'
);

export interface FormSubmission {
  heating_type: string;
  income: string;
  household_size: string;
  is_owner: string;
  name: string;
  email: string;
  postal: string;
  phone: string;
  leadbyte_response?: any;
}

export const saveFormSubmission = async (formData: FormSubmission) => {
  try {
    const { data, error } = await supabase
      .from('LEADS - PAC')  // Mise à jour du nom de la table
      .insert([formData])
      .select();

    if (error) {
      console.error('Error saving to Supabase:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in saveFormSubmission:', error);
    return { success: false, error };
  }
};