import { headers } from 'next/headers';

export const getHost = () => {
  return headers().get('host');
};

export const hasSubdomain = (host: string) => {
  if (!host) return false;
  const segments = host.split('.');
  return host.includes('localhost') ? segments.length > 1 : segments.length > 2;
};

export const getOrg = (host: string) => {
  if (!host) return undefined;
  return hasSubdomain(host) ? host.split('.')[0] : undefined;
};

export const getDomain = (host: string) => {
  //if (!host) return null;

  const segments = host.split('.');

  if (host.includes('localhost')) {
    return 'localhost'
  }

  return segments.slice(-2).join('.');
};


