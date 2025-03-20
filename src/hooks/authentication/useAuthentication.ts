import { jwtDecode } from "jwt-decode";
import { AuthTokenPayLoad, DecodedAuthToken } from "@models";
import { UserRoles } from "@models";
import { useAppContext } from "../appContext/useAppContext";

/* Models */
type UseAuthenticationReturns = DecodedAuthToken & {
  isAuthenticated: boolean;
};

/**
 * Json Web Token decoder.
 */
function useAuthentication(): UseAuthenticationReturns {
  const { authToken } = useAppContext();

  if (!authToken)
    return {
      email: "",
      iat: 0,
      id: 0,
      pseudo: "",
      role: UserRoles.USER,
      isAuthenticated: false,
    };

  const payload = jwtDecode(authToken) as AuthTokenPayLoad;

  return {
    ...payload,
    role: UserRoles[payload.role],
    isAuthenticated: true,
  };
}

/* Exports */
export { useAuthentication };
