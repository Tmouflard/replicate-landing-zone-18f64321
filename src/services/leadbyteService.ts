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
    // Utilisation d'un proxy CORS différent
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const targetUrl = 'https://leadstudio.leadbyte.co.uk/api/submit.php?campid=POMPE-A-CHALEUR&sid=1&returnjson=yes';
    
    const response = await fetch(proxyUrl + encodeURIComponent(targetUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': window.location.origin,
      },
      body: JSON.stringify(leadbyteData),
    });

    if (!response.ok) {
      console.error('Response not OK:', await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Leadbyte response:', data);
    return data;
  } catch (error) {
    console.error('Error submitting to Leadbyte:', error);
    throw error;
  }
};