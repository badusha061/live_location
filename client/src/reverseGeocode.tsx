const reverseGeocode = async (lat, lng) => {
    const apiKey = 'AIzaSyAsc69G6yC0OKUVzNm5o90_EvDHHNL7wxE'; 
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
   
    try {
       const response = await fetch(url);
       const data = await response.json();
       if (data.status === 'OK') {
         // Extract the location name from the first result
         const locationName = data.results[0].formatted_address;
         return locationName;
       } else {
         throw new Error('Geocoding failed');
       }
    } catch (error) {
       console.error('Error fetching location name:', error);
       return '';
    }
   };
   
export default reverseGeocode