const normalizeOrigin = value => `${value || ''}`.trim().replace(/\/$/, '');

export const getSiteUrl = () => {
  const configuredOrigin = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  if (configuredOrigin) {
    return configuredOrigin;
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return normalizeOrigin(window.location.origin);
  }

  const fallbackPort = process.env.PORT || '3000';
  if (process.env.NODE_ENV !== 'production') {
    return `http://localhost:${fallbackPort}`;
  }

  return 'https://www.osresume.co.in';
};

export const getCanonicalUrl = routePath => {
  const safePath = `${routePath || '/'}`
    .split('?')[0]
    .split('#')[0];
  return `${getSiteUrl()}${safePath === '/' ? '' : safePath}`;
};

export const getSocialImageUrl = imagePath => {
  const path = `${imagePath || '/og-image.jpg'}`;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
};
