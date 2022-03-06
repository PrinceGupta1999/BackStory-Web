import { Analytics, setUserProperties } from 'firebase/analytics';
import {
  GeoIpLookupResponse,
  UserDemographyResponse,
} from '../../types/analytics/demographyResponse';

export const addUserDemographyInfo = async (analytics: Analytics) => {
  const response = await fetch('https://json.geoiplookup.io/');
  if (response.ok) {
    const result: GeoIpLookupResponse = await response.json();

    setUserProperties(analytics, {
      ...convertApiDemographyResponseToUserDemographyResponse(result),
      platform: 'web',
    });
  }
};

const convertApiDemographyResponseToUserDemographyResponse = (
  ipApiResponse: GeoIpLookupResponse
): UserDemographyResponse => {
  return {
    ipAddress: ipApiResponse.ip,
    city: ipApiResponse.city,
    country: ipApiResponse.country_name,
    latitude: ipApiResponse.latitude,
    longitude: ipApiResponse.longitude,
  };
};
