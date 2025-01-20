import { supabase } from "@/integrations/supabase/client";

export const incrementStepVisit = async (stepNumber: number, stepName: string) => {
  const today = new Date().toISOString().split('T')[0];
  
  // Vérifier si une entrée existe déjà pour aujourd'hui
  const { data: existingStats } = await supabase
    .from('step_stats')
    .select()
    .eq('step_number', stepNumber)
    .gte('created_at', today)
    .lt('created_at', new Date(new Date(today).getTime() + 86400000).toISOString())
    .single();

  if (existingStats) {
    // Mettre à jour l'entrée existante
    await supabase
      .from('step_stats')
      .update({ visits: (existingStats.visits || 0) + 1 })
      .eq('id', existingStats.id);
  } else {
    // Créer une nouvelle entrée
    await supabase
      .from('step_stats')
      .insert([
        {
          step_number: stepNumber,
          step_name: stepName,
          visits: 1
        }
      ]);
  }
};

export const updateFormStats = async (type: 'start' | 'success' | 'error') => {
  const today = new Date().toISOString().split('T')[0];
  
  // Vérifier si une entrée existe déjà pour aujourd'hui
  const { data: existingStats } = await supabase
    .from('form_stats')
    .select()
    .eq('form_name', 'eligibility')
    .gte('created_at', today)
    .lt('created_at', new Date(new Date(today).getTime() + 86400000).toISOString())
    .single();

  if (existingStats) {
    // Mettre à jour l'entrée existante
    const updates: { [key: string]: number } = {};
    updates[`${type}s`] = (existingStats[`${type}s`] || 0) + 1;
    
    await supabase
      .from('form_stats')
      .update(updates)
      .eq('id', existingStats.id);
  } else {
    // Créer une nouvelle entrée
    const newStats: { [key: string]: any } = {
      form_name: 'eligibility',
      starts: 0,
      successes: 0,
      errors: 0
    };
    newStats[`${type}s`] = 1;
    
    await supabase
      .from('form_stats')
      .insert([newStats]);
  }
};