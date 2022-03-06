export interface IpApiDemographyResponse {
  query: string; // ip address
  country: string;
  city: string;
  lat: string;
  lon: string;
}

export interface UserDemographyResponse {
  ipAddress: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
}
