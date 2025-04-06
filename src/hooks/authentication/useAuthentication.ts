import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

import { UserModel, UserRoles } from "@models";

import { useAppContext } from "../appContext/useAppContext";

/* Models */
type UseAuthenticationReturns = {
  id: number;
  isAuthenticated: boolean;
  role: UserRoles;
};

/**a
 * Json Web Token decoder.
 */
function useAuthentication(): UseAuthenticationReturns {
  const { authToken } = useAppContext();

  return useMemo(() => {
    if (!authToken) {
      return { id: 0, isAuthenticated: false, role: UserRoles.USER };
    }

    const payload = jwtDecode(authToken) as UserModel;

    return {
      id: payload.id,
      isAuthenticated: true,
      role: UserRoles[payload.role],
    };
  }, [authToken]);
}

/* Exports */
export { useAuthentication };
