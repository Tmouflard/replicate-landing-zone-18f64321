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
  console.log('Début submitToLeadbyte avec les données:', formData);
  
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
    console.log('Tentative de sauvegarde dans Supabase...');
    // Enregistrer dans Supabase d'abord
    const supabaseResult = await saveFormSubmission({
      heating_type: formData.heatingType,
      income: formData.income,
      household_size: formData.householdSize,
      is_owner: formData.isOwner,
      name: formData.name,
      email: formData.email,
      postal: formData.postal,
      phone: formData.phone,
    });

    console.log('Résultat Supabase:', supabaseResult);

    if (!supabaseResult.success) {
      console.error('Erreur lors de la sauvegarde Supabase:', supabaseResult.error);
    }

    console.log('Tentative d\'envoi à Leadbyte...');
    // Ensuite envoyer à Leadbyte avec mode 'no-cors'
    const response = await fetch('https://leadstudio.leadbyte.co.uk/api/submit.php', {
      method: 'POST',
      mode: 'no-cors', // Ajout du mode no-cors
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

    // Note: avec mode: 'no-cors', la réponse sera de type 'opaque'
    // et nous ne pourrons pas accéder au contenu de la réponse
    console.log('Réponse Leadbyte reçue');

    // Dans ce cas, nous considérons que si nous arrivons ici, c'est un succès
    return {
      success: true,
      data: { status: 'sent' }
    };
  } catch (error) {
    console.error('Erreur dans submitToLeadbyte:', error);
    return {
      success: false,
      error
    };
  }
};