'use client';
import { useUser } from '@auth0/nextjs-auth0/client';

import React from 'react';

export const UserProfile = () => {
  const { user } = useUser();

  if (user) {
    return (
      <div>
        <p>Hello, {user.name}</p>
        <a href="/api/auth/logout">Logout</a>
      </div>
    );
  }

  return <div>Hello guest!</div>;
};

export default UserProfile;
