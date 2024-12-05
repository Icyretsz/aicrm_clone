import { client } from "../../../api/[...route]/hono";
import { createDbReponseType } from "@aicrm/api";

export const createDb = async (name : string): Promise<createDbReponseType | null> => {
  const dbName = name + '_db'

  try {

    const response = await client.createDb.$post({
      json: {
        database: {
          name: `${dbName}`,
          owner_name: 'aicrm-test-db_owner'
        }
      }
    })
    const responseJSON = await response.json()

    if ("message" in responseJSON) {
      throw new Error(responseJSON.message);
    }

    return responseJSON
  } catch (error) {
    console.error("Error creating database:", error);
    return null;
  }
};
