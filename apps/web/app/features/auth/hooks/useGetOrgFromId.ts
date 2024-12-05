import { client } from "../../../api/[...route]/hono";
import { OrganizationReponseType } from "@aicrm/api";

export const getOrgFromId = async (org_id: string | null | undefined): Promise<OrganizationReponseType | null> => {
  try {
    if (!org_id) {
      throw new Error("Organization ID is required.");
    }

    const response = await client.organizationFromId[":org_id"].$get({
      param: {
        org_id,
      },
    });
    const responseJSON = await response.json()

    if ("message" in responseJSON) {
      throw new Error(responseJSON.message);
    }

    return responseJSON
  } catch (error) {
    console.error("Error fetching organization:", error);
    return null;
  }
};
