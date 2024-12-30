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
}

export const saveFormSubmission = async (formData: FormSubmission) => {
  console.log('Début saveFormSubmission avec les données:', formData);
  
  try {
    // Vérification que la connexion à Supabase est active
    const { data: connectionTest } = await supabase.from('LEADS - PAC').select('count').limit(1);
    console.log('Test de connexion Supabase:', connectionTest);

    console.log('Tentative d\'insertion dans Supabase...');
    const { data, error } = await supabase
      .from('LEADS - PAC')
      .insert([{
        heating_type: formData.heating_type,
        income: formData.income,
        household_size: formData.household_size,
        is_owner: formData.is_owner,
        name: formData.name,
        email: formData.email,
        postal: formData.postal,
        phone: formData.phone,
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
      return { success: false, error };
    }

    console.log('Données insérées avec succès:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Erreur dans saveFormSubmission:', error);
    return { success: false, error };
  }
};