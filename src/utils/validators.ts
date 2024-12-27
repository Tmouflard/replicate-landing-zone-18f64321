export const isValidFrenchPhoneNumber = (phone: string): boolean => {
  // Remove spaces and dashes
  const cleanPhone = phone.replace(/[\s-]/g, '');
  // Check if it matches French phone number format (starting with 0 and followed by 9 digits)
  return /^0[1-9][0-9]{8}$/.test(cleanPhone);
};

export const isValidFrenchPostalCode = (postal: string): boolean => {
  // French postal codes are 5 digits and start with a number between 01 and 95, 97, 98, or 99
  return /^(?:0[1-9]|[1-8][0-9]|9[0-5]|97|98|99)[0-9]{3}$/.test(postal);
};