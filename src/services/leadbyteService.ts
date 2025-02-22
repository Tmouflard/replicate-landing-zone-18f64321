
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
      C1: 'lp lovable search',
      C2: 'https://france-action-ecologie.com/',
      SOURCE: 'SEARCH - Disco CP'
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
      leadbyteResponse = { status: 'sent', timestamp: new Date().toISOString() };
    } catch (error) {
      console.error('Erreur lors de l\'envoi à Leadbyte:', error);
      leadbyteResponse = { status: 'error', error: error.message, timestamp: new Date().toISOString() };
    }

    return leadbyteResponse;
  } catch (error) {
    console.error('Erreur dans submitToLeadbyte:', error);
    throw error;
  }
}
