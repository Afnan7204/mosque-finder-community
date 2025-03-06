
export const extractCoordinates = (googleMapsLink: string) => {
  try {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = googleMapsLink.match(regex);
    
    if (match && match.length >= 3) {
      return {
        latitude: parseFloat(match[1]),
        longitude: parseFloat(match[2])
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error extracting coordinates:", error);
    return null;
  }
};
