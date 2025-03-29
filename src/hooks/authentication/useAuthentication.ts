import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

import { UserModel } from "@models";

import { useAppContext } from "../appContext/useAppContext";

/* Models */
type UseAuthenticationReturns = {
  id: number;
  isAuthenticated: boolean;
};

/**a
 * Json Web Token decoder.
 */
function useAuthentication(): UseAuthenticationReturns {
  const { authToken } = useAppContext();

  return useMemo(() => {
    if (!authToken) {
      return { id: 0, isAuthenticated: false };
    }

    const payload = jwtDecode(authToken) as UserModel;

    return { id: payload.id, isAuthenticated: true };
  }, [authToken]);
}

/* Exports */
export { useAuthentication };
