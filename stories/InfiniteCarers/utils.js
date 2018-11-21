export function personalDetailsTransformer(row, i) {

  function getCareTypes(value) {
    if(value === 'N/A') {
      return [];
    }
    return value.split(',').map((careType) => careType.trim()).filter((careType) => careType !== '');
  }

  function getTravelMethod(value) {
    if(!value) {
      return 'Driving';
    }
    return value.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).trim()).join(' ');
  }

  return {
    id: i + 1,
    name: row[0],
    crmStatus: row[1].trim(),
    jobTitle: (row[2] !== 'unknown' && row[2] !== 'Not assigned') ? row[2].trim() : undefined,
    defaultTravelMethod: getTravelMethod(row[3]),
    careTypes: getCareTypes(row[4])
  };
};
