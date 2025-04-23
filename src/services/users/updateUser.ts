import { env } from "@configs";
import { UserModel, AuthToken, User } from "@models";
import { updateService } from "../utils";

/**
 * Update User service.
 */
async function updateUser(
  id: number,
  userInfo: Partial<User>,
  authToken: AuthToken,
): Promise<UserModel> {
  const url = `${env.API_URL}/api/users/${id}`;
  return await updateService<Partial<User>, UserModel>({
    url,
    body: userInfo,
    authToken,
  });
}

/* Exports */
export { updateUser };
