import { env } from "@configs";
import { AuthToken } from "@models";
import { deleteService } from "../utils";

/**
 * Delete User service.
 */
async function deleteUser(id: number, authToken: AuthToken): Promise<string> {
  const url = `${env.API_URL}/api/users/${id}`;

  return await deleteService({
    url,
    authToken,
  });
}

/* Exports */
export { deleteUser };
