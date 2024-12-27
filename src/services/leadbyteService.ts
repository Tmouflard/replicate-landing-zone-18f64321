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
  // Mapping des données du formulaire vers le format Leadbyte exactement comme dans le formulaire HTML
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
    const response = await fetch('https://leadstudio.leadbyte.co.uk/api/submit.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        ...leadbyteData,
        campid: 'POMPE-A-CHALEUR',
        sid: '1',
        returnjson: 'yes'
      }).toString()
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Leadbyte error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Leadbyte response:', data);
    
    // On considère la réponse comme un succès si nous n'avons pas d'erreur
    return {
      success: !data.code || data.code === 0,
      ...data
    };
  } catch (error) {
    console.error('Error submitting to Leadbyte:', error);
    throw error;
  }
};