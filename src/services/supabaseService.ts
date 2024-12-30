import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      .from('form_submissions')
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