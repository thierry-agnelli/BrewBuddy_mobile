import { UserRoles } from "../user/User";
/**
 * AuthToken
 */
type AuthToken = string | null;

/**
 * Base auth token payload
 */
type BaseAuthToken = {
  email: string;
  iat: number;
  id: number;
  pseudo: string;
};

/**
 * AuthToken payload
 */
type AuthTokenPayLoad = BaseAuthToken & {
  role: keyof typeof UserRoles;
};

/**
 * Decoded AuthToken
 */
type DecodedAuthToken = BaseAuthToken & {
  role: UserRoles;
};

/* export */
export type { AuthToken, AuthTokenPayLoad, DecodedAuthToken };
