import { saveFormSubmission, supabase } from './supabaseService';

interface LeadbyteData {
  firstname: string;
  lastname: string;
  email: string;
  phone1: string;
  postcode: string;
  chauffage: string;
  proprietaire: string;
  habitation: string;
}

export const submitToLeadbyte = async (formData: any): Promise<any> => {
  const [firstName, ...lastNameParts] = formData.name.split(' ');
  
  const leadbyteData: LeadbyteData = {
    firstname: firstName,
    lastname: lastNameParts.join(' '),
    email: formData.email,
    phone1: formData.phone,
    postcode: formData.postal,
    chauffage: formData.heatingType,
    proprietaire: formData.isOwner === 'oui' ? 'Propriétaire' : 'Locataire',
    habitation: formData.householdSize,
  };

  try {
    // Enregistrer dans Supabase d'abord
    await saveFormSubmission({
      heating_type: formData.heatingType,
      income: formData.income,
      household_size: formData.householdSize,
      is_owner: formData.isOwner,
      name: formData.name,
      email: formData.email,
      postal: formData.postal,
      phone: formData.phone,
    });

    // Ensuite envoyer à Leadbyte
    const response = await fetch('https://leadstudio.leadbyte.co.uk/api/submit.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        ...leadbyteData,
        campid: 'POMPE-A-CHALEUR',
        sid: '1',
        returnjson: 'yes',
        C1: 'LP-LOVABLE',
        C2: 'https://france-action-ecologie.com/',
        SOURCE: 'PMAX-LOVABLE'
      }).toString()
    });

    const data = await response.json();
    console.log('Leadbyte response:', data);

    // Mettre à jour l'entrée Supabase avec la réponse de Leadbyte
    await supabase
      .from('form_submissions')
      .update({ leadbyte_response: data })
      .eq('email', formData.email)
      .eq('created_at', new Date().toISOString());

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      success: false,
      error
    };
  }
};