export enum AnalyticsScreen {
  HOME = 'home',
  ALL_THOTS = 'allThots',
  FEATURED_THOTS = 'featuredThots',
  SEARCH_THOTS = 'searchThots',
  THOT = 'thot',
  ABOUT = 'about',
  PRIVACY_POLICY = 'privacyPolicy',
  TERMS_OF_USE = 'termsOfUse',
  GRIEVANCE_REDRESSAL = 'grievanceRedressal',
  ADMIN = 'ADMIN',
}

export const getAnalyticsScreenFromUrl = (url: string) => {
  //! Make sure of the ordering. Go from index to nested
  if (!url?.length) return url;
  if (url === '/') return AnalyticsScreen.HOME;
  if (url === '/about') return AnalyticsScreen.ABOUT;
  if (url === '/grievance-redressal')
    return AnalyticsScreen.GRIEVANCE_REDRESSAL;
  if (url === '/privacy-policy') return AnalyticsScreen.PRIVACY_POLICY;
  if (url === '/terms-of-use') return AnalyticsScreen.TERMS_OF_USE;
  if (url.startsWith('/admin')) return AnalyticsScreen.ADMIN;
  if (url === '/today-in-history') return AnalyticsScreen.ALL_THOTS;
  if (url === '/today-in-history/featured')
    return AnalyticsScreen.FEATURED_THOTS;
  if (url.startsWith('/today-in-history/tag/'))
    return AnalyticsScreen.SEARCH_THOTS;
  if (url.startsWith('/today-in-history/')) return AnalyticsScreen.THOT;
  return url;
};
