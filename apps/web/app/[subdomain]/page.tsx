'use client'
import React, {useEffect, useState} from 'react';
import {useUser} from "@auth0/nextjs-auth0/client";
import type {UserProfile} from "@auth0/nextjs-auth0/client";
import {getOrgFromId} from "../features/auth/hooks/useGetOrgFromId";
import {OrganizationReponseType} from "@aicrm/api"


interface UserProfileWithOrgName extends UserProfile {
  org_name: string;
}

const Page = () => {

  const [org, setOrg] = useState<OrganizationReponseType | null>(null);
  const { user } = useUser()

  useEffect(() => {
    const fetchOrg = async () => {
      if (user) {
        const org = await getOrgFromId(user.org_id);
        setOrg(org);
      }
    };

    fetchOrg();
  }, [user]);

  return (
    <div>
      <h1 style={{fontSize: 50}}>This is {org?.display_name} page</h1>
      Welcome {user?.name}
      <div><a href='/api/auth/logout'>Logout</a></div>
    </div>
  );
};

export default Page;
