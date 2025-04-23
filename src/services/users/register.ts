import { env } from "@configs";
import { BaseUser } from "@models";

import { postService } from "../utils/postService.ts";

/* Models */

/**
 * Register data.
 */
type RegisterUserData = BaseUser & {
  pseudo: string;
};

/**
 * Register service.
 */
async function register(user: RegisterUserData): Promise<string> {
  const url = `${env.API_URL}/api/users`;
  const body = user;

  await postService<RegisterUserData>({ url, body });
  return "Success";
}

/* Export */
export { register };
export type { RegisterUserData };
