export interface GeoIpLookupResponse {
  ip: string; // ip address
  country_name: string;
  city: string;
  latitude: number;
  longitude: number;
}

export interface UserDemographyResponse {
  ipAddress: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
}
