import './global.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata = {
  title: 'Welcome to mobile',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
