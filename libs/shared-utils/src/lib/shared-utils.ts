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

export const getDomain = (host: string, needPort? : boolean) => {
  if (!host) return null;

  const cleanHost = host.split('/')[0];

  const segments = cleanHost.split('.');

  if (cleanHost.includes('localhost') && !needPort) {
    return 'localhost';
  } else if (cleanHost.includes('localhost') && needPort) {
    return 'localhost:3002'
  }

  return segments.slice(-2).join('.');
};


