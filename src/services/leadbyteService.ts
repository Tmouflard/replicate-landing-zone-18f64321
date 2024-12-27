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

    const data = await response.json();
    console.log('Leadbyte response:', data);
    
    // On redirige dans tous les cas
    window.location.href = "https://experts-renovation.com/merci-pac/";
    
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error submitting to Leadbyte:', error);
    // On redirige même en cas d'erreur
    window.location.href = "https://experts-renovation.com/merci-pac/";
    return {
      success: false,
      error
    };
  }
};