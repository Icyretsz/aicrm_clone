'use client'
import React from 'react';
import {useParams} from "next/navigation";

const Page = () => {
  const { status, message } = useParams();
  let errorMessage

  if (message.includes('organization') && message.includes('invalid')) {
    errorMessage = 'Organization not exist.'
  } else if (message.includes('access_denied') || message.includes('unauthorized_org')) {
    errorMessage = 'User not belong to this organization'
  }


  return (
    <div>
      <p>Error: {status}</p>
      <p>Error description: {message}</p>
      <p>Cause: {errorMessage}</p>
      <p className='underline'><a href='/'>Return to home page</a></p>
    </div>
  );
};

export default Page;
