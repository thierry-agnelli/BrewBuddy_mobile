import { env } from "@configs";
import { AuthToken, UserModel } from "@models";
import { getService } from "../utils/getService.ts";

/**
 * Get User service.
 */
function getUser(id: number, authToken: AuthToken): Promise<UserModel> {
  const url = `${env.API_URL}/api/users/${id}`;
  const headers = {
    accept: "application/json",
    "Content-type": "application/json",
    Authorization: "Bearer " + authToken,
  };

  return getService({
    url,
    headers,
  });
}

/* Exports */
export { getUser };
