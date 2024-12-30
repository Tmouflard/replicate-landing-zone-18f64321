import { saveFormSubmission } from './supabaseService';

export const submitToLeadbyte = async (formData: any): Promise<any> => {
  console.log('Début submitToLeadbyte avec les données:', formData);
  
  const [firstName, ...lastNameParts] = formData.name.split(' ');
  
  try {
    const leadbyteData = new URLSearchParams({
      firstname: firstName,
      lastname: lastNameParts.join(' '),
      email: formData.email,
      phone1: formData.phone,
      postcode: formData.postal,
      chauffage: formData.heatingType,
      proprietaire: formData.isOwner === 'oui' ? 'Propriétaire' : 'Locataire',
      habitation: formData.householdSize,
      campid: 'POMPE-A-CHALEUR',
      sid: '1',
      returnjson: 'yes',
      C1: 'LP-LOVABLE',
      C2: 'https://france-action-ecologie.com/',
      SOURCE: 'PMAX-LOVABLE'
    });

    let leadbyteResponse = null;

    try {
      const response = await fetch('https://leadstudio.leadbyte.co.uk/api/submit.php', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: leadbyteData
      });
      leadbyteResponse = { status: 'sent' };
    } catch (error) {
      console.error('Erreur lors de l\'envoi à Leadbyte:', error);
      leadbyteResponse = { status: 'error', error: error.message };
    }

    // Sauvegarde dans Supabase avec la réponse de Leadbyte
    await saveFormSubmission({
      heating_type: formData.heatingType,
      income: formData.income,
      household_size: formData.householdSize,
      is_owner: formData.isOwner,
      name: formData.name,
      email: formData.email,
      postal: formData.postal,
      phone: formData.phone,
      leadbyte_response: leadbyteResponse
    });

    return { success: true, data: { status: 'sent' } };
  } catch (error) {
    console.error('Erreur dans submitToLeadbyte:', error);
    throw error;
  }
}