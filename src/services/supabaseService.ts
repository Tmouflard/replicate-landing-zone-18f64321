import { createClient } from '@supabase/supabase-js';

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
}

export const saveFormSubmission = async (formData: FormSubmission) => {
  try {
    const { data, error } = await supabase
      .from('LEADS - PAC')
      .insert([{
        ...formData,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) {
      console.error('Erreur Supabase détaillée:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw error;
    }

    console.log('Données insérées avec succès:', data);
    return data;
  } catch (error) {
    console.error('Erreur dans saveFormSubmission:', error);
    throw error;
  }
};