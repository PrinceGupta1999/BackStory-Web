import { Analytics, setUserProperties } from 'firebase/analytics';
import {
  IpApiDemographyResponse,
  UserDemographyResponse,
} from '../../types/analytics/demographyResponse';

export const addUserDemographyInfo = async (analytics: Analytics) => {
  const response = await fetch(
    'http://ip-api.com/json?fields=country,city,lat,lon,query'
  );
  if (response.ok) {
    const result: IpApiDemographyResponse = await response.json();

    setUserProperties(analytics, {
      ...convertApiDemographyResponseToUserDemographyResponse(result),
      platform: 'web',
    });
  }
};

const convertApiDemographyResponseToUserDemographyResponse = (
  ipApiResponse: IpApiDemographyResponse
): UserDemographyResponse => {
  return {
    ipAddress: ipApiResponse.query,
    city: ipApiResponse.city,
    country: ipApiResponse.country,
    latitude: parseFloat(ipApiResponse.lat),
    longitude: parseFloat(ipApiResponse.lon),
  };
};
