import { useState, useEffect } from "react";
import { client } from "../../../../../web/app/api/[...route]/hono";
import { OrganizationReponseType } from '@aicrm/api'

const useGetOrgs = (): OrganizationReponseType[] | null => {
  const [organizations, setOrganizations] = useState<OrganizationReponseType[] | null>(null);

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const response = await client.organizations.$get()
        const data = await response.json();

        if ("message" in data) {
          throw new Error(data.message)
        }

        setOrganizations(data)

      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchOrg();
  }, []);

  return organizations;
};

export default useGetOrgs;
