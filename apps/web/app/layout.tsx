import { AntdRegistry } from '@ant-design/nextjs-registry';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import './global.css';

export const metadata = {
  title: 'Welcome to web',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <UserProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </UserProvider>
      </body>
    </html>
  );
}
