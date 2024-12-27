interface LeadbyteData {
  email: string;
  firstname: string;
  lastname: string;
  postcode: string;
  c2?: string;
  chauffage: string;
  proprietaire: string;
  habitation: string;
}

export const submitToLeadbyte = async (formData: any): Promise<any> => {
  // Mapping des données du formulaire vers le format Leadbyte
  const leadbyteData: LeadbyteData = {
    email: formData.email,
    firstname: formData.name.split(' ')[0],
    lastname: formData.name.split(' ').slice(1).join(' '),
    postcode: formData.postal,
    chauffage: formData.heatingType,
    proprietaire: formData.isOwner === 'oui' ? 'yes' : 'no',
    habitation: formData.householdSize,
  };

  try {
    // Utilisation d'un proxy CORS pour éviter les erreurs
    const proxyUrl = 'https://corsproxy.io/?';
    const targetUrl = 'https://leadstudio.leadbyte.co.uk/api/submit.php?campid=POMPE-A-CHALEUR&sid=1&returnjson=yes';
    
    const response = await fetch(proxyUrl + encodeURIComponent(targetUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadbyteData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting to Leadbyte:', error);
    throw error;
  }
};