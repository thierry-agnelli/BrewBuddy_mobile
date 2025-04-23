import { env } from "@configs";
import { AuthToken, BaseUser } from "@models";

import { postService } from "../utils/postService.ts";

/* Models */

/**
 * Login user data.
 */
type LoginUserData = BaseUser;

/**
 * Login server response
 */
type LoginResponse = {
  accessToken: AuthToken;
};

/**
 * Authenticate service.
 */
async function authenticate(credentials: LoginUserData): Promise<AuthToken> {
  const url = `${env.API_URL}/api/login`;

  const response = await postService<LoginUserData, LoginResponse>({
    url,
    body: credentials,
  });
  return response.accessToken;
}

/* Export */
export { authenticate };
