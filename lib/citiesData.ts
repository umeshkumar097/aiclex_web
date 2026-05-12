export const majorCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
  "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara",
  "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi",
  "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Jabalpur", "Gwalior",
  "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad", "Bareilly",
  "Noida", "Gurgaon", "Greater Noida", "Faridabad", "Dehradun", "Rishikesh", "Haridwar", "Mohali", "Panchkula"
];

export const citySlugs = majorCities.map(city => city.toLowerCase().replace(/\s+/g, '-'));

export function getCityName(slug: string) {
  const index = citySlugs.indexOf(slug.toLowerCase());
  return index !== -1 ? majorCities[index] : null;
}
